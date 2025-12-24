import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
  },
  back: {
    fontSize: 22,
    paddingHorizontal: 6,
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  address: {
    fontSize: 15,
  },
  empty: {
    padding: 20,
    textAlign: "center",
    color: "#777",
  },
});