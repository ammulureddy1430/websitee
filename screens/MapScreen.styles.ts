import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    back: {
        position: "absolute",
        top: 50,
        left: 16,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
    },
    confirm: {
        position: "absolute",
        bottom: 40,
        right: 16,
        backgroundColor: "#FF6B00",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
    },
    zoomContainer: {
        position: "absolute",
        left: 16,
        bottom: 110,
        backgroundColor: "transparent",
        alignItems: "center",
    },
    zoomButton: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});
