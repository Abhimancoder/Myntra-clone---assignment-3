const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: String,
  name: String,
  price: Number,
  originalPrice: Number,
  category: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);