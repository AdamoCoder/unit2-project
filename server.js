const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const app = express();


mongoose.connect(process.env.MONGODB_URI);
console.log('Connected to MongoDB');

const Item = require("./models/item.js");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// GET /
app.get("/", async (req, res) => {
  res.render("home.ejs");
});

// GET /items
app.get("/items", async (req, res) => {
  const allItems = await Item.find();
  res.render("items/fullList.ejs", { items: allItems });
});

// GET /items/new
app.get("/items/new", (req, res) => {
  res.render("items/new.ejs");
});

app.get("/items/:itemId", async (req, res) => {
  const foundItem = await Item.findById(req.params.itemId);
  res.render("items/show.ejs", { item: foundItem });
});

app.get("/items/:itemId/edit", async (req, res) => {
  const foundItem = await Item.findById(req.params.itemId);
  res.render("items/edit.ejs", {
    item: foundItem,
  });
});

// POST /items
app.post("/items", async (req, res) => {
  if (req.body.isItemCold === "on") {
    req.body.isItemCold = true;
  } else {
    req.body.isItemCold = false;
  }
  await Item.create(req.body);
  res.redirect("/items");
});

// PUT
app.put("/items/:itemId", async (req, res) => {
  if (req.body.isItemCold === "on") {
    req.body.isItemCold = true;
  } else {
    req.body.isItemCold = false;
  }
  await Item.findByIdAndUpdate(req.params.itemId, req.body);
  res.redirect(`/items/${req.params.itemId}`);
});

// DELETE
app.delete("/items/:itemId", async (req, res) => {
  await Item.findByIdAndDelete(req.params.itemId);
  res.redirect("/items");
});

app.listen(3333, () => {
  console.log('Listening on port 3333');
});