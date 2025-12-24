import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Restaurant } from "../types";
import { styles } from "./RestaurantCard.styles";

interface Props {
  restaurant: Restaurant;
  onPress: () => void;
}

export default function RestaurantCard({ restaurant, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* IMAGE */}
      <Image
        source={restaurant.image}
        style={styles.image}
        resizeMode="cover"
      />

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
