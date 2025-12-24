// Run: node server.js
// Install deps:
// npm install express body-parser cors jsonwebtoken uuid

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// SECRET for JWT
const SECRET = "CHANGE_THIS_SECRET_KEY";

// In-memory data
let users = [];
let orders = [];

let restaurants = [
  {
    id: "r1",
    name: "Green Bowl",
    rating: 4.7,
    deliveryTime: "25-35 min",
    image: "https://via.placeholder.com/400x200.png?text=Green+Bowl",
  },
  {
    id: "r2",
    name: "Spice Hub",
    rating: 4.5,
    deliveryTime: "30-40 min",
    image: "https://via.placeholder.com/400x200.png?text=Spice+Hub",
  },
  {
    id: "r3",
    name: "Taco Point",
    rating: 4.3,
    deliveryTime: "20-30 min",
    image: "https://via.placeholder.com/400x200.png?text=Taco+Point",
  },
];

// -------------------------------
// JWT Helpers
// -------------------------------
function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header)
    return res.status(401).json({ message: "Missing Authorization header" });

  const parts = header.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({ message: "Invalid Authorization header" });

  try {
    const data = jwt.verify(parts[1], SECRET);
    req.user = data;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// -------------------------------
// AUTH ROUTES
// -------------------------------

// Signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (users.find((u) => u.email === email))
    return res.status(400).json({ message: "Email already exists" });

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password,
  };

  users.push(newUser);

  const token = signToken(newUser);

  res.json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const token = signToken(user);

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// Get profile
app.get("/profile", auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ user });
});

// -------------------------------
// RESTAURANTS
// -------------------------------
app.get("/restaurants", auth, (req, res) => {
  res.json({ restaurants });
});

// -------------------------------
// ORDERS
// -------------------------------

// Create order
app.post("/orders", auth, (req, res) => {
  const { items, subtotal, paymentMethod, coords, address } = req.body;

  const id = uuidv4();

  const driverStart = {
    latitude: coords.latitude + 0.01,
    longitude: coords.longitude - 0.01,
  };

  const order = {
    id,
    items,
    subtotal,
    paymentMethod,
    coords,
    address,
    userId: req.user.id,
    status: "accepted",
    driver: {
      id: "d1",
      name: "John Driver",
      coords: driverStart,
    },
  };

  orders.push(order);

  setTimeout(() => updateStatus(id, "preparing"), 3000);
  setTimeout(() => updateStatus(id, "out_for_delivery"), 7000);
  setTimeout(() => updateStatus(id, "delivered"), 15000);

  res.json({ orderId: id, order });
});

// Get order by ID
app.get("/orders/:id", auth, (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json({ order });
});

// -------------------------------
// Helper to update status
// -------------------------------
function updateStatus(orderId, status) {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  order.status = status;

  if (status === "out_for_delivery") {
    order.driver.coords = {
      latitude: order.coords.latitude + 0.005,
      longitude: order.coords.longitude - 0.005,
    };
  }

  if (status === "delivered") {
    order.driver.coords = order.coords;
  }
}

// -------------------------------
app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
