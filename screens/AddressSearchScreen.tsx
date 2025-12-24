import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocation } from "../context/LocationContext";
import { styles } from "./AddressSearchScreen.styles";

interface Place {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function AddressSearchScreen() {
  const router = useRouter();
  const locCtx = useLocation(); // may be null in some setups
  const setLocationFromAddress =
    locCtx?.setLocationFromAddress ??
    ((coords: { latitude: number; longitude: number }, address: string) =>
      console.warn("LocationProvider missing - cannot set location", coords, address));

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.log("Address search error", e);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Search delivery address"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id.toString()}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setLocationFromAddress(
                {
                  latitude: Number(item.lat),
                  longitude: Number(item.lon),
                },
                item.display_name
              );
              router.back();
            }}
          >
            <Text style={styles.address}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          query.length > 2 && !loading ? (
            <Text style={styles.empty}>No results</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}