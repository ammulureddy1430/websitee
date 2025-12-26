import React, { useMemo, useCallback } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import RestaurantCard from "../components/RestaurantCard";
import { RESTAURANTS } from "../data/restaurants";
import { useFavorites } from "../context/FavoritesContext";
import { styles } from "./SavedScreen.styles";

type Restaurant = typeof RESTAURANTS[number];

export default function SavedScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();

  const savedRestaurants = useMemo(
    () => RESTAURANTS.filter((r) => favorites.includes(r.id)),
    [favorites]
  );

  const onBookmarkToast = useCallback((msg: string) => {
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => (
      <RestaurantCard
        restaurant={item}
        onPress={() => router.push(`/restaurant/${item.id}`)}
        onBookmarkToast={onBookmarkToast}
      />
    ),
    [router, onBookmarkToast]
  );

  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
        <Ionicons name="arrow-back" size={20} />
      </TouchableOpacity>

      <FlatList<Restaurant>
        contentContainerStyle={savedRestaurants.length ? styles.list : styles.emptyContainer}
        data={savedRestaurants}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyInner}>
            <Text style={styles.emptyTitle}>No saved restaurants</Text>
            <Text style={styles.emptySub}>Tap the bookmark icon to save</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}