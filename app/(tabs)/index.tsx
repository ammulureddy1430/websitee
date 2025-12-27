import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "@/screens/HomeScreen";
export default function HomeTab() {
  return (
    <SafeAreaProvider>
        <HomeScreen />
    </SafeAreaProvider>
  );
}