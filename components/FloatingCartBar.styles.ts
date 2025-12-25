import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 70,
        left: 16,
        right: 16,
        backgroundColor: "#000",
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 8,
    },
    items: {
        color: "#fff",
        fontSize: 14,
    },
    total: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    cta: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
