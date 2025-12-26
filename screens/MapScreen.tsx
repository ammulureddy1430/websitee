import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import MapView, { Marker, MapPressEvent, Region, PROVIDER_GOOGLE } from "react-native-maps";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "../context/LocationContext";
import { styles } from "./MapScreen.styles";

export default function MapScreen() {
  const router = useRouter();
  const { location, setLocationFromMap } = useLocation();

  const worldRegion: Region = {
    latitude: 20,
    longitude: 0,
    latitudeDelta: 140,
    longitudeDelta: 140,
  };

  const initialCoord = {
    latitude: location?.latitude ?? 37.78825,
    longitude: location?.longitude ?? -122.4324,
  };

  const [coord, setCoord] = useState(initialCoord);
  const [selected, setSelected] = useState(false);

  const [region, setRegion] = useState<Region>({
    latitude: location?.latitude ?? worldRegion.latitude,
    longitude: location?.longitude ?? worldRegion.longitude,
    latitudeDelta: location ? 0.05 : worldRegion.latitudeDelta,
    longitudeDelta: location ? 0.05 : worldRegion.longitudeDelta,
  });

  const mapRef = useRef<MapView | null>(null);

  const onMapPress = (e: MapPressEvent) => {
    const c = e.nativeEvent.coordinate;
    setCoord({ latitude: c.latitude, longitude: c.longitude });
    setSelected(true);

    const newRegion: Region = {
      ...region,
      latitude: c.latitude,
      longitude: c.longitude,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 200);
  };

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const zoomIn = () => {
    setRegion((r) => {
      const newRegion = {
        ...r,
        latitudeDelta: clamp(r.latitudeDelta * 0.5, 0.0005, worldRegion.latitudeDelta),
        longitudeDelta: clamp(r.longitudeDelta * 0.5, 0.0005, worldRegion.longitudeDelta),
      };
      mapRef.current?.animateToRegion(newRegion, 200);
      return newRegion;
    });
  };

  const zoomOut = () => {
    setRegion((r) => {
      const newRegion = {
        ...r,
        latitudeDelta: clamp(r.latitudeDelta * 2, 0.0005, worldRegion.latitudeDelta),
        longitudeDelta: clamp(r.longitudeDelta * 2, 0.0005, worldRegion.longitudeDelta),
      };
      mapRef.current?.animateToRegion(newRegion, 200);
      return newRegion;
    });
  };

  const viewWorld = () => {
    setRegion(worldRegion);
    mapRef.current?.animateToRegion(worldRegion, 300);
    setSelected(false);
  };

  const centerOnUser = () => {
    if (location?.latitude && location?.longitude) {
      const userRegion: Region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(userRegion);
      mapRef.current?.animateToRegion(userRegion, 300);
      setCoord({ latitude: userRegion.latitude, longitude: userRegion.longitude });
      setSelected(true);
    }
  };

  const confirmLocation = async () => {
    await setLocationFromMap(coord.latitude, coord.longitude);
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region}
        onPress={onMapPress}
        showsUserLocation
        showsMyLocationButton={false}
        zoomEnabled
        scrollEnabled
        pitchEnabled
        rotateEnabled
        minZoomLevel={0}
        maxZoomLevel={20}
        followsUserLocation={false}
      >
        {selected && <Marker coordinate={coord} />}
      </MapView>

      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} />
      </TouchableOpacity>

      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Ionicons name="remove" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.zoomButton, { marginTop: 8 }]} onPress={zoomIn}>
          <Ionicons name="add" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.zoomButton, { marginTop: 8 }]} onPress={viewWorld}>
          <Text style={{ fontWeight: "700" }}>World</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.zoomButton, { marginTop: 8 }]} onPress={centerOnUser}>
          <Ionicons name="locate" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {selected && (
        <TouchableOpacity style={styles.confirm} onPress={confirmLocation}>
          <Text style={{ color: "white", fontWeight: "700" }}>Confirm location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}