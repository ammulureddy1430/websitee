import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingBottom: 8,
    },

    backBtn: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: "#f2f2f2",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 12,
    },

    content: {
        flex: 1,
        padding: 16,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },

    itemText: {
        fontSize: 16,
    },

    subtotal: {
        marginTop: 16,
        fontWeight: "700",
        fontSize: 18,
    },

    checkoutBtn: {
        marginTop: 20,
        backgroundColor: "#FF6B00",
        padding: 16,
        borderRadius: 12,
    },

    checkoutText: {
        color: "white",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
    },
});
