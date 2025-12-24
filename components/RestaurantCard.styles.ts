import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden", // 🔑 clips image corners
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 160,          // 🔑 consistent height
    backgroundColor: "#eee",
  },

  infoBox: {
    padding: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  sub: {
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },
});
