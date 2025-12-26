import React, { useState } from "react";
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
import Toast from "@/components/Toast";

export default function Home() {
  const router = useRouter();
  const { location } = useLocation();

  // 🔑 TOAST STATE (GLOBAL)
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <Header
        title="Uber Eats"
        showLocation
        address={location?.address}
        onPressLocation={() => router.push("/map")}
      />

      {/* TITLE */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Nearby Restaurants
        </Text>
      </View>

      {/* RESTAURANT LIST */}
      <FlatList
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 160, // space for cart bar + toast
        }}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => router.push(`/restaurant/${item.id}`)}
            onBookmarkToast={(msg) => {
              setToastMsg(msg);
              setToastVisible(true);
            }}
          />
        )}
      />

      {/* OPEN MAP BUTTON */}
      <TouchableOpacity
        onPress={() => router.push("/map")}
        style={{
          position: "absolute",
          bottom: 15,
          right: 20,
          backgroundColor: "#FF6B00",
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 30,
          zIndex: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>
          Open Map
        </Text>
      </TouchableOpacity>

      {/* FLOATING CART BAR */}
      <FloatingCartBar />

      {/* 🔔 GLOBAL TOAST (BOTTOM OF SCREEN) */}
      <Toast
        visible={toastVisible}
        message={toastMsg}
        onHide={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
}
