import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { useCart } from "../context/CartContext";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const { cart } = useCart();
  const router = useRouter();

  const items = Object.values(cart.items);
  const subtotal = items.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        {items.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(i) => i.item.id}
              renderItem={({ item }) => (
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}
                >
                  <Text>{item.item.name} x{item.qty}</Text>
                  <Text>${(item.item.price * item.qty).toFixed(2)}</Text>
                </View>
              )}
            />

            <Text style={{ marginTop: 20, fontWeight: "700", fontSize: 18 }}>
              Subtotal: ${subtotal.toFixed(2)}
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#FF6B00",
                padding: 14,
                borderRadius: 10,
              }}
              onPress={() => router.push("/checkout")}
            >
              <Text style={{ color: "white", textAlign: "center", fontWeight: "700" }}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
