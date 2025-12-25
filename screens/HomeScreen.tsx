import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import { useRouter } from "expo-router";
import { useLocation } from "../context/LocationContext";
import RestaurantCard from "../components/RestaurantCard";
import { RESTAURANTS } from "../data/restaurants";
import FloatingCartBar from "@/components/FloatingCartBar";

// ...existing code...
export default function Home() {
  const router = useRouter();
  const { location } = useLocation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Uber Eats"
        showLocation
        address={location?.address}
        onPressLocation={() => router.push("/map")}
      />

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Nearby Restaurants
        </Text>
      </View>

      <FlatList
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 140 }}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => router.push(`/restaurant/${item.id}`)}
          />
        )}
      />

      <TouchableOpacity
        onPress={() => router.push("/map")}
        style={{
          position: "absolute",
          bottom: 40,
          right: 20,
          backgroundColor: "#FF6B00",
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 30,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Open Map</Text>
      </TouchableOpacity>
      <FloatingCartBar />
    </SafeAreaView>
  );
}