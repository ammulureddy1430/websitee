import React, { createContext, useContext, useState } from "react";

type Location = {
  latitude: number;
  longitude: number;
  address: string;
};

type LocationContextType = {
  location: Location | null;
  setLocationFromAddress: (
    coords: { latitude: number; longitude: number },
    address: string
  ) => void;
  setLocationFromMap: (lat: number, lng: number) => Promise<void>;
};

const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<Location | null>(null);

  // 🔹 When selected from search (Google Places)
  const setLocationFromAddress = (
    coords: { latitude: number; longitude: number },
    address: string
  ) => {
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
      address,
    });
  };

  // 🔥 When selected from MAP (reverse geocoding)
  const setLocationFromMap = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await res.json();
      const a = data.address || {};

      // Build full readable address
      const addressParts = [
        a.house_number,
        a.road,
        a.neighbourhood,
        a.suburb,
        a.village,
        a.town,
        a.city,
        a.county, 
        a.state,
        a.country,
      ];

      const fullAddress = addressParts
        .filter(Boolean)
        .join(", ");

      setLocation({
        latitude: lat,
        longitude: lng,
        address: fullAddress || "Selected location",
      });
    } catch (err) {
      console.log("Reverse geocoding error", err);
      setLocation({
        latitude: lat,
        longitude: lng,
        address: "Selected location",
      });
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocationFromAddress,
        setLocationFromMap,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used inside LocationProvider");
  }
  return ctx;
};
