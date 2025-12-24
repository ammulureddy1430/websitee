import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function AccountTab() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Account</Text>

      {user ? (
        <>
          <Text style={{ marginTop: 12 }}>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>

          <TouchableOpacity
            onPress={logout}
            style={{
              backgroundColor: "#FF6B00",
              padding: 12,
              marginTop: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ marginTop: 12 }}>You are not logged in.</Text>
      )}
    </View>
  );
}
