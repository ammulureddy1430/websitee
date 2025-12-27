import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
        marginTop: 40,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
        fontSize: 16,
        color: "#222",
    },
    filters: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 8,
    },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: "#eee",
        marginRight: 8,
    },
    chipActive: {
        backgroundColor: "#ff7a00",
    },
    chipText: {
        color: "#333",
        fontSize: 14,
    },
    chipTextActive: {
        color: "#fff",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginVertical: 6,
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
    },
    subText: {
        color: "#666",
        fontSize: 13,
        marginTop: 2,
    },
    highlight: {
        backgroundColor: "rgba(255,122,0,0.12)",
    },
});
