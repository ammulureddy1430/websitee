import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Header.styles";

interface Props {
  title: string;
  showLocation?: boolean;
  address?: string;
  onPressLocation?: () => void;
}

export default function Header({
  title,
  showLocation,
  address,
  onPressLocation,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {showLocation && (
        <TouchableOpacity style={styles.locationBox} onPress={onPressLocation}>
          <Ionicons name="location" size={18} color="#FF6B00" />
          <Text style={styles.address} numberOfLines={1}>
            {address || "Select address"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
