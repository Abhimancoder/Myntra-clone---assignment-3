const grid = document.getElementById("product-grid");
const searchBox = document.getElementById("search-box");
let productList = [];

function discountPercent(product) {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

async function loadProducts(category = "", search = "") {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const response = await fetch("http://localhost:5000/api/products?" + params);
  productList = await response.json();

  grid.innerHTML = "";

  if (productList.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach((product) => {
    const wished = isWished(product._id);
    const off = discountPercent(product);

    grid.innerHTML += `
      <a class="card-link" href="product.html?id=${product._id}">
        <div class="card">
          <div class="card-img">
            <img src="${product.image}" alt="${product.name}" />
            <button class="heart ${wished ? "active" : ""}" data-id="${product._id}">${wished ? "♥" : "♡"}</button>
          </div>
          <div class="card-info">
            <p class="brand">${product.brand}</p>
            <p class="name">${product.name}</p>
            <p class="price">
              Rs. ${product.price}
              ${off ? `<span class="old-price">Rs. ${product.originalPrice}</span><span class="off">(${off}% OFF)</span>` : ""}
            </p>
          </div>
        </div>
      </a>
    `;
  });
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".heart");
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();

  const product = productList.find((p) => p._id === btn.dataset.id);
  if (!product) return;

  toggleWishlist(product);
  const wished = isWished(product._id);
  btn.textContent = wished ? "♥" : "♡";
  btn.classList.toggle("active", wished);
});

document.querySelectorAll(".menu li").forEach((item) => {
  item.addEventListener("click", () => {
    searchBox.value = "";
    loadProducts(item.dataset.category);
  });
});

searchBox.addEventListener("input", () => {
  loadProducts("", searchBox.value);
});

loadProducts();