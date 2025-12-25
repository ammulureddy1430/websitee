import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { LocationProvider } from "../context/LocationContext";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LocationProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </CartProvider>
      </LocationProvider>
    </SafeAreaProvider>
  );
}
