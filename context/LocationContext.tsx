import React, { createContext, useContext, useState } from "react";

type Location = {
  latitude: number;
  longitude: number;
  address: string;
};

type LocationContextType = {
  setLocationFromAddress: (coords: { latitude: number; longitude: number; }, address: string) => void;
  location: Location | null;
  setLocation: (loc: Location) => void;
};

const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocationState] = useState<Location | null>(null);

  const setLocation = (loc: Location) => {
    setLocationState(loc);
  };

  const setLocationFromAddress = (coords: { latitude: number; longitude: number }, address: string) => {
    setLocationState({ latitude: coords.latitude, longitude: coords.longitude, address });
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, setLocationFromAddress }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be inside LocationProvider");
  }
  return ctx;
};
