import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "../context/LocationContext";
import { styles } from "./MapScreen.styles";

export default function MapScreen() {
  const router = useRouter();
  const { setLocation } = useLocation();

  const [coord, setCoord] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [region, setRegion] = useState<Region>({
    latitude: coord!.latitude,
    longitude: coord!.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [selected, setSelected] = useState(false);

  const mapRef = useRef<MapView | null>(null);

  const onMapPress = (e: MapPressEvent) => {
    const c = e.nativeEvent.coordinate;
    setCoord({ latitude: c.latitude, longitude: c.longitude });
    setSelected(true);
    const newRegion = { ...region, latitude: c.latitude, longitude: c.longitude };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 200);
  };

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const zoomIn = () => {
    setRegion((r) => {
      const latDelta = clamp(r.latitudeDelta * 0.5, 0.0005, 1.5);
      const lonDelta = clamp(r.longitudeDelta * 0.5, 0.0005, 1.5);
      const newRegion = { ...r, latitudeDelta: latDelta, longitudeDelta: lonDelta };
      mapRef.current?.animateToRegion(newRegion, 200);
      return newRegion;
    });
  };

  const zoomOut = () => {
    setRegion((r) => {
      const latDelta = clamp(r.latitudeDelta * 2, 0.0005, 1.5);
      const lonDelta = clamp(r.longitudeDelta * 2, 0.0005, 1.5);
      const newRegion = { ...r, latitudeDelta: latDelta, longitudeDelta: lonDelta };
      mapRef.current?.animateToRegion(newRegion, 200);
      return newRegion;
    });
  };

  const confirmLocation = () => {
    if (!coord) return;
    setLocation({
      latitude: coord.latitude,
      longitude: coord.longitude,
      address: `Lat ${coord.latitude.toFixed(4)}, Lng ${coord.longitude.toFixed(4)}`,
    });
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={region}
        onPress={onMapPress}
      >
        {coord && <Marker coordinate={coord} />}
      </MapView>

      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} />
      </TouchableOpacity>

      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="remove" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.zoomButton, { marginTop: 8 }]} onPress={zoomIn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="add" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {selected && (
        <TouchableOpacity style={styles.confirm} onPress={confirmLocation}>
          <Text style={{ color: "white", fontWeight: "700" }}>Confirm</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}