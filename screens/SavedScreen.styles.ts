import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    backBtn: {
        position: "absolute",
        top: 60,
        left: 12,
        zIndex: 10,
        padding: 8,
        borderRadius: 20,
    },
    list: { padding: 12, paddingTop: 56 },
    emptyContainer: { flexGrow: 1 },
    emptyInner: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
    emptyTitle: { fontSize: 18, fontWeight: "600" },
    emptySub: { marginTop: 6, color: "#666" },
});
