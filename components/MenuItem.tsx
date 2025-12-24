import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MenuItemType } from "../types";
import { useCart } from "../context/CartContext";
import { styles } from "./MenuItem.styles";

interface Props {
  item: MenuItemType;
}

export default function MenuItem({ item }: Props) {
  const { add, remove, cart } = useCart();
  const qty = cart.items[item.id]?.qty || 0;

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={{ color: "#666" }}>{item.desc}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>

      {qty === 0 ? (
        <TouchableOpacity style={styles.addBtn} onPress={() => add(item)}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => remove(item.id)}>
            <Text style={styles.counterBtn}>-</Text>
          </TouchableOpacity>

          <Text style={{ width: 30, textAlign: "center", fontSize: 16 }}>
            {qty}
          </Text>

          <TouchableOpacity onPress={() => add(item)}>
            <Text style={styles.counterBtn}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
