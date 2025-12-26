import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./CartScreen.styles";

export default function CartScreen() {
  const { cart } = useCart();
  const router = useRouter();

  const items = Object.values(cart.items);
  const subtotal = items.reduce(
    (sum, entry) => sum + entry.item.price * entry.qty,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cart</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {items.length === 0 ? (
          <Text style={{ color: "#666" }}>Your cart is empty.</Text>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(i) => i.item.id}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.itemText}>
                    {item.item.name} x{item.qty}
                  </Text>
                  <Text style={styles.itemText}>
                    ${(item.item.price * item.qty).toFixed(2)}
                  </Text>
                </View>
              )}
            />

            <Text style={styles.subtotal}>
              Subtotal: ${subtotal.toFixed(2)}
            </Text>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => router.push("/checkout")}
            >
              <Text style={styles.checkoutText}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
