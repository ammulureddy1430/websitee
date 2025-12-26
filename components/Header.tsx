import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Header.styles";
import { useLocation } from "../context/LocationContext";
import { useRouter } from "expo-router";

interface Props {
  title: string;
  showLocation?: boolean;
  onPressLocation?: () => void;
}

export default function Header({
  title,
  showLocation,
  onPressLocation,
}: Props) {
  const { location } = useLocation();
  const router = useRouter();

  const displayAddress = location?.address || "Select address";

  const handlePress = () => {
    if (onPressLocation) {
      onPressLocation();
    } else {
      router.push("/address/search");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {showLocation && (
        <TouchableOpacity style={styles.locationBox} onPress={handlePress}>
          <Ionicons name="location" size={18} color="#FF6B00" />
          <Text style={styles.address} numberOfLines={1}>
            {displayAddress}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
