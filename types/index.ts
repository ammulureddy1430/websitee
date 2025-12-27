import { ImageSourcePropType } from "react-native";

export interface MenuItemType {
  isVeg: boolean | undefined;
  id: string;
  name: string;
  desc: string;
  price: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Restaurant {
  isVeg: boolean | undefined;
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  image: ImageSourcePropType; // ✅ FIXED HERE
  coords: Coordinates;
  menu: MenuItemType[];
}

export interface Order {
  id: string;
  items: MenuItemType[];
  subtotal: number;
  paymentMethod: string;
  coords: Coordinates;
  address: string;
  status: string;
  driver?: {
    id: string;
    name: string;
    coords: Coordinates;
  };
}
