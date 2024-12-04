const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    isItemCold: Boolean,
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;