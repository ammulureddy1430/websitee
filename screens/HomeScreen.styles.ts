import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  mapButton: {
    position: "absolute",
    right: 16,
    bottom: 24,
    backgroundColor: "#FF6B00",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 28,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  mapButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});