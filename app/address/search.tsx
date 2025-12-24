import React, { useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Animated,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRouter } from "expo-router";
import { useLocation } from "../../context/LocationContext";

const GOOGLE_KEY = "YOUR_GOOGLE_API_KEY";

export default function AddressSearchScreen() {
  const router = useRouter();
  const { setLocationFromAddress } = useLocation();

  // 🔥 animation value
  const focusAnim = useRef(new Animated.Value(0)).current;

  // 🔥 animate on focus
  const onFocus = () => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  // 🔥 animate on blur
  const onBlur = () => {
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  // 🔥 animated styles
  const animatedStyle = {
    transform: [
      {
        scale: focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.03], // subtle expand
        }),
      },
    ],
    backgroundColor: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#f2f2f2", "#ffffff"],
    }),
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor: "#fff" }}>
      <GooglePlacesAutocomplete
        placeholder="Search delivery address"
        fetchDetails

        renderLeftButton={() => (
          <View
            style={{
              height: 48,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: 4,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontSize: 20 }}>←</Text>
            </TouchableOpacity>
          </View>
        )}

        onPress={(data, details = null) => {
          const loc = details?.geometry?.location;
          if (loc) {
            setLocationFromAddress(
              { latitude: loc.lat, longitude: loc.lng },
              data.description
            );
            router.back();
          }
        }}

        query={{
          key: GOOGLE_KEY,
          language: "en",
        }}

        enablePoweredByContainer={false}

        styles={{
          container: { flex: 1 },

          textInputContainer: {
            flexDirection: "row",
            alignItems: "center",
          },

          // ⚠️ we override input using Animated.View
          textInput: {
            height: 48,
            paddingLeft: 8,
            paddingRight: 12,
            borderRadius: 10,
            fontSize: 16,
            backgroundColor: "transparent",
          },
        }}

        textInputProps={{
          onFocus,
          onBlur,
        }}

        renderDescription={(row) => row.description}
      />

      {/* 🔥 Animated background layer */}
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            height: 48,
            borderRadius: 10,
            zIndex: -1,
          },
          animatedStyle,
        ]}
      />
    </SafeAreaView>
  );
}
