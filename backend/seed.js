require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const p = (brand, name, price, originalPrice, category, seed) => ({
  brand,
  name,
  price,
  originalPrice,
  category,
  image: "https://picsum.photos/seed/" + seed + "/300/400",
});

const products = [
  p("Nike", "Running Shoes", 3499, 6995, "Men", "nike-shoes"),
  p("H&M", "Cotton T-Shirt", 799, 1299, "Men", "hm-tshirt"),
  p("Puma", "Sports Jacket", 2999, 5999, "Men", "puma-jacket"),
  p("Levis", "Slim Fit Jeans", 1799, 3599, "Men", "levis-jeans"),
  p("Roadster", "Casual Shirt", 699, 1599, "Men", "roadster-shirt"),
  p("Wrogn", "Hooded Sweatshirt", 1299, 2599, "Men", "wrogn-hoodie"),
  p("US Polo", "Polo T-Shirt", 999, 1999, "Men", "uspolo-polo"),
  p("Campus", "Sports Sneakers", 1499, 2999, "Men", "campus-sneakers"),
  p("Zara", "Floral Dress", 2599, 4299, "Women", "zara-dress"),
  p("Biba", "Printed Kurta", 1299, 2599, "Women", "biba-kurta"),
  p("W", "Anarkali Set", 2199, 4399, "Women", "w-anarkali"),
  p("Libas", "Palazzo Set", 1499, 2999, "Women", "libas-palazzo"),
  p("Vero Moda", "Denim Jacket", 1999, 3999, "Women", "veromoda-jacket"),
  p("Mango", "Crop Top", 899, 1799, "Women", "mango-top"),
  p("Aurelia", "Cotton Kurti", 799, 1599, "Women", "aurelia-kurti"),
  p("Steve Madden", "Block Heels", 2799, 4999, "Women", "steve-heels"),
  p("Adidas", "Kids Sneakers", 1999, 3299, "Kids", "adidas-kids"),
  p("Gini & Jony", "Kids T-Shirt Set", 699, 1399, "Kids", "gj-tshirt"),
  p("Max", "Girls Party Frock", 1199, 2399, "Kids", "max-frock"),
  p("Allen Solly", "Boys Polo", 599, 1199, "Kids", "as-polo"),
  p("Puma", "Kids Track Pants", 899, 1799, "Kids", "puma-track"),
  p("H&M", "Kids Denim Shorts", 549, 1099, "Kids", "hm-shorts"),
  p("Fabindia", "Kids Kurta Pyjama", 1099, 1999, "Kids", "fab-kurta"),
  p("Crocs", "Kids Clogs", 1299, 2199, "Kids", "crocs-clogs"),
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(products.length + " products added to database!");
    process.exit();
  })
  .catch((err) => {
    console.log("Error:", err.message);
    process.exit(1);
  });