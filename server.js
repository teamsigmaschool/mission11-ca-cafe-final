const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sigma Café menu. Stored in memory, so it resets whenever the server restarts.
const menu = [
  { id: 1, name: "Flat White", price: 6.5, available: true },
  { id: 2, name: "Iced Americano", price: 5, available: true },
  { id: 3, name: "Banana Bread", price: 4.5, available: false },
];
let nextId = 4;

// GET /menu — return every item, optionally filtered by availability
app.get("/menu", (req, res) => {
  const { available } = req.query;

  if (available === "true") {
    return res.json(menu.filter((item) => item.available === true));
  }
  if (available === "false") {
    return res.json(menu.filter((item) => item.available === false));
  }

  res.json(menu);
});

// GET /menu/:id — return one item
app.get("/menu/:id", (req, res) => {
  const item = menu.find((entry) => entry.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// POST /menu — add a new item
app.post("/menu", (req, res) => {
  const { name, price } = req.body;
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }

  const item = { id: nextId++, name: name.trim(), price, available: true };

  menu.push(item);
  res.status(201).json(item);
});

// PUT /menu/:id — update an item
app.put("/menu/:id", (req, res) => {
  const item = menu.find((entry) => entry.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  const { name, price, available } = req.body;
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }
  if (typeof available !== "boolean") {
    return res.status(400).json({ error: "Available must be true or false" });
  }

  item.name = name.trim();
  item.price = price;
  item.available = available;

  res.status(200).json(item);
});

// DELETE /menu/:id — remove an item
app.delete("/menu/:id", (req, res) => {
  const index = menu.findIndex((entry) => entry.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  menu.splice(index, 1);
  res.json({ message: "Item deleted" });
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Could not start the server. Is it already running?", error.message);
    return;
  }
  console.log(`Sigma Café API listening on port ${PORT}`);
});
