import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { RESTAURANTS } from "@/data/restaurants";
import { styles } from "./search.styles";

const RECENT_KEY = "RECENT_SEARCHES";

type SearchResult = {
  id: string;
  name: string;
  type: "restaurant" | "dish";
  restaurantId: string;
  restaurantName?: string;
  isVeg?: boolean;
  rating?: number;
};

/* 🔦 Highlight helper */
function HighlightText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  if (!highlight) return <Text>{text}</Text>;

  const lowerText = text.toLowerCase();
  const lowerHighlight = highlight.toLowerCase();
  const index = lowerText.indexOf(lowerHighlight);

  if (index === -1) return <Text>{text}</Text>;

  return (
    <Text>
      {text.slice(0, index)}
      <Text style={styles.highlight}>
        {text.slice(index, index + highlight.length)}
      </Text>
      {text.slice(index + highlight.length)}
    </Text>
  );
}

/* 🎬 Animated row */
function AnimatedRow({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        delay: index * 35,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        delay: index * 35,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity, transform: [{ translateY }] }}
    >
      {children}
    </Animated.View>
  );
}

export default function SearchTab() {
  const router = useRouter();

  /* 🔤 Search */
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] =
    useState("");

  /* 🕒 Recent */
  const [recentSearches, setRecentSearches] =
    useState<string[]>([]);

  /* 🎯 Filters */
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] =
    useState(false);
  const [minRating, setMinRating] =
    useState<number | null>(null);

  /* 📥 Load recent searches */
  useEffect(() => {
    AsyncStorage.getItem(RECENT_KEY).then((data) => {
      if (data) setRecentSearches(JSON.parse(data));
    });
  }, []);

  /* 💾 Save search */
  const saveSearch = async (text: string) => {
    if (!text.trim()) return;

    const updated = [
      text,
      ...recentSearches.filter((s) => s !== text),
    ].slice(0, 5);

    setRecentSearches(updated);
    await AsyncStorage.setItem(
      RECENT_KEY,
      JSON.stringify(updated)
    );
  };

  /* ⏳ Debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query) saveSearch(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  /* 🔍 Search + Filter */
  const searchResults: SearchResult[] =
    useMemo(() => {
      if (!debouncedQuery) return [];

      const q = debouncedQuery.toLowerCase();
      let results: SearchResult[] = [];

      RESTAURANTS.forEach((restaurant) => {
        const matchesRestaurant =
          restaurant.name.toLowerCase().includes(q);

        if (matchesRestaurant) {
          results.push({
            id: restaurant.id,
            name: restaurant.name,
            type: "restaurant",
            restaurantId: restaurant.id,
            isVeg: restaurant.isVeg,
            rating: restaurant.rating,
          });
        }

        restaurant.menu.forEach((item) => {
          if (item.name.toLowerCase().includes(q)) {
            results.push({
              id: item.id,
              name: item.name,
              type: "dish",
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              isVeg: item.isVeg,
              rating: restaurant.rating,
            });
          }
        });
      });

      /* 🟢 Veg / 🔴 Non-veg filter */
      if (vegOnly)
        results = results.filter((r) => r.isVeg);
      if (nonVegOnly)
        results = results.filter((r) => !r.isVeg);

      /* ⭐ Rating filter */
      if (minRating)
        results = results.filter(
          (r) => (r.rating ?? 0) >= minRating
        );

      return results;
    }, [
      debouncedQuery,
      vegOnly,
      nonVegOnly,
      minRating,
    ]);

  return (
    <View style={styles.container}>
      {/* 🔍 Search bar */}
      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
        />
        <TextInput
          placeholder="Search restaurants or dishes"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      {/* 🎯 Filters */}
      <View style={styles.filters}>
        <FilterChip
          label="Veg"
          active={vegOnly}
          onPress={() => {
            setVegOnly(!vegOnly);
            setNonVegOnly(false);
          }}
        />
        <FilterChip
          label="Non-Veg"
          active={nonVegOnly}
          onPress={() => {
            setNonVegOnly(!nonVegOnly);
            setVegOnly(false);
          }}
        />
        <FilterChip
          label="⭐ 4+"
          active={minRating === 4}
          onPress={() =>
            setMinRating(minRating ? null : 4)
          }
        />
      </View>

      {/* 🔎 Results */}
      {query.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) =>
            `${item.type}-${item.id}`
          }
          renderItem={({ item, index }) => (
            <AnimatedRow index={index}>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  router.push(
                    `/restaurant/${item.restaurantId}`
                  )
                }
              >
                <Ionicons
                  name={
                    item.type === "restaurant"
                      ? "restaurant-outline"
                      : "fast-food-outline"
                  }
                  size={22}
                  color="#ff7a00"
                />

                <View style={{ marginLeft: 12 }}>
                  <HighlightText
                    text={item.name}
                    highlight={debouncedQuery}
                  />
                  {item.type === "dish" && (
                    <Text style={styles.subText}>
                      from {item.restaurantName}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </AnimatedRow>
          )}
        />
      )}
    </View>
  );
}

/* 🎯 Filter chip */
function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        active && styles.chipActive,
      ]}
    >
      <Text
        style={[
          styles.chipText,
          active && styles.chipTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

