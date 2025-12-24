import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "@/screens/HomeScreen";
import { LocationProvider } from "@/context/LocationContext";

export default function HomeTab() {
  return (
    <SafeAreaProvider>
      <LocationProvider>
        <HomeScreen />
      </LocationProvider>
    </SafeAreaProvider>
  );
}