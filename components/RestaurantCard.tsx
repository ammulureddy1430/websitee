import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Restaurant } from "../types";
import { styles } from "./RestaurantCard.styles";
import { useFavorites } from "../context/FavoritesContext";

interface Props {
  restaurant: Restaurant;
  onPress: () => void;
  onBookmarkToast: (msg: string) => void; // 🔑 for global toast
}

export default function RestaurantCard({
  restaurant,
  onPress,
  onBookmarkToast,
}: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const saved = isFavorite(restaurant.id);

  // 🔔 Bookmark animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleBookmarkPress = () => {
    // Animate icon
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    // Toggle favorite
    toggleFavorite(restaurant.id);

    // Trigger toast in Home screen
    onBookmarkToast(
      saved ? "Removed from bookmarks" : "Added to bookmarks"
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <Image
          source={restaurant.image}
          style={styles.image}
          resizeMode="cover"
        />

        {/* BOOKMARK ICON */}
        <Animated.View
          style={[
            styles.bookmarkBtn,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <TouchableOpacity
            onPress={handleBookmarkPress}
            activeOpacity={0.8}
          >
            <Ionicons
              name={saved ? "bookmark" : "bookmark-outline"}
              size={22}
              color={saved ? "#FF6B00" : "#000"}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* INFO */}
      <View style={styles.infoBox}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.sub}>
          {restaurant.rating} ⭐ • {restaurant.deliveryTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
