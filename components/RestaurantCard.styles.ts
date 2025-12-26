import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 160,
  },
  bookmarkBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
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
  },
});
