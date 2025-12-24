import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { RESTAURANTS } from "../data/restaurants";
import MenuItem from "../components/MenuItem";

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const restaurant = RESTAURANTS.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <SafeAreaView>
        <Text>Restaurant not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 🔙 BACK BUTTON */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{
          position: "absolute",
          top: 50,
          left: 16,
          zIndex: 10,
          backgroundColor: "white",
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Ionicons name="arrow-back" size={22} color="#000" />
      </TouchableOpacity>

      {/* 🖼 RESTAURANT IMAGE */}
      <Image
        source={restaurant.image}
        style={{ width: "100%", height: 180 }}
        resizeMode="cover"
      />

      {/* ℹ️ INFO */}
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>
          {restaurant.name}
        </Text>

        <Text style={{ color: "#666", marginTop: 4 }}>
          {restaurant.rating} ⭐ • {restaurant.deliveryTime}
        </Text>
      </View>

      {/* 🍽 MENU */}
      <FlatList
        data={restaurant.menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}
