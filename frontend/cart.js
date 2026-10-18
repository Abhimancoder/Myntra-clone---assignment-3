function getCart() {
  // old items without a size are ignored
  return (JSON.parse(localStorage.getItem("bag")) || []).filter((item) => item.size);
}

function saveCart(cart) {
  localStorage.setItem("bag", JSON.stringify(cart));
}

function cartKey(id, size) {
  return id + "|" + size;
}

function addToCart(product, size) {
  const cart = getCart();
  const key = cartKey(product._id, size);
  const existing = cart.find((item) => item.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key,
      _id: product._id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      qty: 1,
    });
  }

  saveCart(cart);
  updateBagCount();
}

function updateBagCount() {
  const el = document.getElementById("bag-count");
  if (el) {
    el.textContent = getCart().reduce((sum, item) => sum + item.qty, 0);
  }
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function isWished(id) {
  return getWishlist().some((item) => item._id === id);
}

function toggleWishlist(product) {
  let list = getWishlist();

  if (list.some((item) => item._id === product._id)) {
    list = list.filter((item) => item._id !== product._id);
  } else {
    list.push({
      _id: product._id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  }

  localStorage.setItem("wishlist", JSON.stringify(list));
}

document.addEventListener("DOMContentLoaded", updateBagCount);