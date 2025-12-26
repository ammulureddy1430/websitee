import React, { useState, useMemo, useCallback } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "../context/CartContext";
import { useLocation } from "../context/LocationContext";
import api from "../services/api";
import { styles } from "./CheckoutScreen.styles";

export default function CheckoutScreen() {
  const cartCtx = useCart();
  const cart = cartCtx?.cart ?? { items: {}, total: 0 };
  const items = Object.values(cart.items ?? {});
  const { location } = useLocation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((s, e) => s + (e.item.price ?? 0) * e.qty, 0),
    [items]
  );

  const placeOrder = useCallback(async () => {
    if (items.length === 0) {
      Alert.alert("Cart is empty", "Add items to your cart before placing an order.");
      return;
    }
    setLoading(true);
    try {
      const orderBody = {
        items: items.map((e) => ({ id: e.item.id, qty: e.qty, price: e.item.price })),
        subtotal,
        paymentMethod: "cash",
        coords: (location as any)?.coords ?? null,
        address: location?.address ?? "",
      };
      const res = await api.post("/orders", orderBody);
      const orderId = res?.data?.orderId ?? res?.order?.id ?? res?.orderId;
      if (typeof cartCtx?.clearCart === "function") cartCtx.clearCart();
      if (orderId) router.replace(`/order/${orderId}`);
      else router.replace("/orders");
    } catch (err) {
      const msg = (err as Error).message ?? "Something went wrong";
      Alert.alert("Error placing order", msg);
    } finally {
      setLoading(false);
    }
  }, [items, subtotal, location, cartCtx, router]);

  const navigateToMap = useCallback(() => {
    try {
      router.push("/map");
    } catch (err) {
      console.warn(err);
    }
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Items</Text>

        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(e) => e.item.id}
            style={styles.list}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.item.name}</Text>
                  <Text style={styles.itemQty}>Qty: {item.qty}</Text>
                </View>
                <Text style={styles.itemPrice}>${((item.item.price ?? 0) * item.qty).toFixed(2)}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
          />
        )}

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.locationRow}>
            <Text style={styles.locationLabel}>Delivery address</Text>
            <TouchableOpacity onPress={navigateToMap} activeOpacity={0.8} hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }} accessibilityRole="button">
              <Text style={styles.locationText}>{location?.address ?? "Choose location"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.placeBtn, loading || items.length === 0 ? styles.disabledBtn : null]} onPress={placeOrder} disabled={loading || items.length === 0}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.placeBtnText}>Place order</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}