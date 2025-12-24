import { useCart } from "@/context/CartContext";
import { useLocation } from "@/context/LocationContext";
import api from "@/services/api";
import { useRouter } from "expo-router";
import { Alert, View, Button, Text } from "react-native";

export default function CheckoutScreen() {
  const cartCtx = useCart();
  const cart = cartCtx?.cart ?? { items: {}, total: 0 };
  const { location } = useLocation();
  const router = useRouter();

  const placeOrder = async () => {
    try {
      const orderBody = {
        items: Object.values(cart.items ?? {}),
        subtotal: cart.total ?? 0,
        paymentMethod: "cash",
        coords: (location as any)?.coords ?? null,
        address: location?.address ?? "",
      };

      const res = await api.post("/orders", orderBody);

      const orderId = res?.data?.orderId ?? res?.order?.id ?? res?.orderId;

      // call clearCart only if the context provides it (avoids TS error if not present)
      if (typeof cartCtx?.clearCart === "function") {
        cartCtx.clearCart();
      }

      if (orderId) {
        router.replace(`/order/${orderId}`);
      } else {
        router.replace("/orders");
      }
    } catch (err) {
      const msg = (err as Error).message ?? "Something went wrong";
      Alert.alert("Error placing order", msg);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Checkout</Text>
      <Button title="Place order" onPress={placeOrder} />
    </View>
  );
}