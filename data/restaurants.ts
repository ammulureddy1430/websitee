import { Restaurant } from "../types";
import { Images } from "../assets/images";

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Green Bowl",
    rating: 4.7,
    deliveryTime: "25–35 min",
    image: Images.GreenBowl,
    coords: { latitude: 37.78825, longitude: -122.4324 },
    menu: [
      {
        id: "m1",
        name: "Quinoa Salad",
        price: 7.99,
        desc: "Fresh veggies + quinoa",
      },
      {
        id: "m2",
        name: "Avocado Toast",
        price: 5.99,
        desc: "Sourdough + smashed avocado",
      },
    ],
  },
  {
    id: "r2",
    name: "Spice Hub",
    rating: 4.5,
    deliveryTime: "30–40 min",
    image: Images.SpiceHub,
    coords: { latitude: 37.78925, longitude: -122.435 },
    menu: [
      {
        id: "m3",
        name: "Butter Chicken",
        price: 10.99,
        desc: "Creamy tomato curry",
      },
      {
        id: "m4",
        name: "Garlic Naan",
        price: 2.99,
        desc: "Tandoor baked naan",
      },
    ],
  },
  {
    id: "r3",
    name: "Taco Point",
    rating: 4.3,
    deliveryTime: "20–30 min",
    image: Images.TacoBell,
    coords: { latitude: 37.7865, longitude: -122.43 },
    menu: [
      {
        id: "m5",
        name: "Al Pastor Taco",
        price: 3.99,
        desc: "Pineapple-marinated pork",
      },
      {
        id: "m6",
        name: "Chips & Salsa",
        price: 2.99,
        desc: "Crispy chips + salsa",
      },
    ],
  },
];
