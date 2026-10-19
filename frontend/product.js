const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const box = document.getElementById("product-detail");

const SIZES = ["S", "M", "L", "XL"];
let selectedSize = null;

async function loadProduct() {
  try {
    const response = await fetch(API_URL + "/api/products/" + id);

    if (!response.ok) {
      box.innerHTML = "<p>Product not found. It may have been removed.</p>";
      return;
    }

    const product = await response.json();

    const off =
      product.originalPrice && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    box.innerHTML = `
      <img class="detail-img" src="${product.image}" alt="${product.name}" />
      <div class="detail-info">
        <h2>${product.brand}</h2>
        <p class="name">${product.name}</p>
        <p class="detail-price">
          Rs. ${product.price}
          ${off ? `<span class="old-price">Rs. ${product.originalPrice}</span><span class="off">(${off}% OFF)</span>` : ""}
        </p>
        <p class="tax-note">inclusive of all taxes</p>
        <p class="name">Category: ${product.category}</p>

        <p class="size-title">SELECT SIZE</p>
        <div class="sizes">
          ${SIZES.map((s) => `<button class="size-btn" data-size="${s}">${s}</button>`).join("")}
        </div>
        <p id="size-error" class="size-error"></p>

        <button id="add-btn" class="btn">ADD TO BAG</button>
        <button id="wish-btn" class="btn btn-outline"></button>
      </div>
    `;

    const sizeError = document.getElementById("size-error");

    document.querySelectorAll(".size-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedSize = btn.dataset.size;
        sizeError.textContent = "";
        document.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    const wishBtn = document.getElementById("wish-btn");

    function updateWishBtn() {
      wishBtn.textContent = isWished(product._id) ? "♥ WISHLISTED" : "♡ WISHLIST";
    }
    updateWishBtn();

    wishBtn.addEventListener("click", () => {
      toggleWishlist(product);
      updateWishBtn();
    });

    document.getElementById("add-btn").addEventListener("click", () => {
      if (!selectedSize) {
        sizeError.textContent = "Please select a size";
        return;
      }
      addToCart(product, selectedSize);
      alert("Added to bag! (Size " + selectedSize + ")");
    });
  } catch (err) {
    box.innerHTML = "<p>Could not load product. Is the server running?</p>";
  }
}

loadProduct();