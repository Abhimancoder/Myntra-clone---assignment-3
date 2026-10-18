const box = document.getElementById("wishlist-grid");

function renderWishlist() {
  const list = getWishlist();
  box.innerHTML = "";

  if (list.length === 0) {
    box.innerHTML = "<p>Your wishlist is empty. Tap the heart on a product to save it.</p>";
    return;
  }

  list.forEach((product) => {
    box.innerHTML += `
      <div class="card">
        <a class="card-link" href="product.html?id=${product._id}">
          <div class="card-img"><img src="${product.image}" alt="${product.name}" /></div>
          <div class="card-info">
            <p class="brand">${product.brand}</p>
            <p class="name">${product.name}</p>
            <p class="price">Rs. ${product.price}</p>
          </div>
        </a>
        <div class="wish-actions">
          <button class="btn-small" onclick="moveToBag('${product._id}')">MOVE TO BAG</button>
          <button class="remove-btn" onclick="removeWish('${product._id}')">Remove</button>
        </div>
      </div>
    `;
  });
}

function removeWish(id) {
  const product = getWishlist().find((p) => p._id === id);
  if (product) toggleWishlist(product);
  renderWishlist();
}

function moveToBag(id) {
  const product = getWishlist().find((p) => p._id === id);
  if (!product) return;

  addToCart(product);
  toggleWishlist(product);
  renderWishlist();
}

renderWishlist();