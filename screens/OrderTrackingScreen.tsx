import React, { useEffect, useRef, useState } from "react";
import { Platform, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import api from "../services/api";
import { MapHTML } from "./MapHTML";

export default function OrderTrackingScreen() {
  const { orderId } = useLocalSearchParams();

  type Coords = { latitude: number; longitude: number };
  type Driver = { coords?: Coords };
  type Order = { coords: Coords; driver?: Driver };

  const [order, setOrder] = useState<Order | null>(null);
  const [eta, setEta] = useState<number | null>(null);

  const webRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await api.get(`/orders/${orderId}`);
      setOrder(res.order);

      if (webRef.current && res.order.driver?.coords) {
        const { latitude, longitude } = res.order.driver.coords;
        webRef.current.injectJavaScript(`updateDriver(${latitude}, ${longitude});`);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  if (!order) return <Text>Loading...</Text>;

  const user = order.coords;
  const driver = order.driver?.coords || null;

  if (Platform.OS === "web") {
    const leaflet = require("react-leaflet");
    const { MapContainer, TileLayer, Marker } = leaflet;

    return (
      <View style={{ flex: 1 }}>
        <div style={{ height: "100%", width: "100%" }}>
          <MapContainer
            center={[user.latitude, user.longitude]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[user.latitude, user.longitude]} />
            {driver && <Marker position={[driver.latitude, driver.longitude]} />}
          </MapContainer>
        </div>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, padding: 10 }}>ETA: {eta ? `${eta} min` : "Calculating..."}</Text>

      <WebView
        ref={webRef}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        source={{ html: MapHTML(user, driver) }}
        onMessage={(e) => {
          const msg = JSON.parse(e.nativeEvent.data);
          if (msg.type === "eta") setEta(msg.eta);
        }}
      />
    </View>
  );
}
