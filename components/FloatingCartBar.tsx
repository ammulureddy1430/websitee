import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../context/CartContext";
import { styles } from "./FloatingCartBar.styles";

export default function FloatingCartBar() {
  const { cart } = useCart();
  const router = useRouter();

  const itemCount = Object.values(cart.items).reduce(
    (sum, i) => sum + i.qty,
    0
  );

  if (itemCount === 0) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/cart")}
      activeOpacity={0.9}
    >
      <View>
        <Text style={styles.items}>{itemCount} items</Text>
        <Text style={styles.total}>${cart.total.toFixed(2)}</Text>
      </View>

      <Text style={styles.cta}>View cart</Text>
    </TouchableOpacity>
  );
}
