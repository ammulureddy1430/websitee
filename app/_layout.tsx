import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { LocationProvider } from "@/context/LocationContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LocationProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LocationProvider>
    </SafeAreaProvider>
  );
}