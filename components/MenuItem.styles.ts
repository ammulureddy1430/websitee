import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
        backgroundColor: "white",
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    price: {
        marginTop: 6,
        fontWeight: "700",
    },
    addBtn: {
        backgroundColor: "#FF6B00",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: "center",
    },
    addText: {
        color: "white",
        fontWeight: "700",
    },
    counter: {
        flexDirection: "row",
        alignItems: "center",
    },
    counterBtn: {
        fontSize: 22,
        paddingHorizontal: 10,
    },
});
