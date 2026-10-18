const itemsBox = document.getElementById("bag-items");
const totalBox = document.getElementById("bag-total");
const orderBtn = document.getElementById("order-btn");

function renderBag() {
  const cart = getCart();
  itemsBox.innerHTML = "";

  if (cart.length === 0) {
    itemsBox.innerHTML = "<p>Your bag is empty.</p>";
    totalBox.textContent = "";
    orderBtn.style.display = "none";
    updateBagCount();
    return;
  }

  orderBtn.style.display = "inline-block";

  cart.forEach((item) => {
    itemsBox.innerHTML += `
      <div class="bag-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="bag-info">
          <p class="brand">${item.brand}</p>
          <p class="name">${item.name}</p>
          <p class="name">Size: <strong>${item.size}</strong></p>
          <p class="price">Rs. ${item.price}</p>
          <div>
            <button class="qty-btn" onclick="changeQty('${item.key}', -1)">-</button>
            <span class="qty">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.key}', 1)">+</button>
            <button class="remove-btn" onclick="removeItem('${item.key}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  totalBox.textContent = "Total: Rs. " + total;
  updateBagCount();
}

function changeQty(key, change) {
  const cart = getCart();
  const item = cart.find((i) => i.key === key);
  if (!item) return;

  item.qty += change;
  const updated = item.qty <= 0 ? cart.filter((i) => i.key !== key) : cart;

  saveCart(updated);
  renderBag();
}

function removeItem(key) {
  saveCart(getCart().filter((i) => i.key !== key));
  renderBag();
}

orderBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your bag is empty");
    return;
  }

  if (!token) {
    alert("Please log in to place an order");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        items: cart.map((i) => ({ _id: i._id, qty: i.qty, size: i.size })),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      saveCart([]);
      alert("Order placed!");
      window.location.href = "orders.html";
    } else {
      alert(data.message);
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = "login.html";
      }
    }
  } catch (err) {
    alert("Could not reach the server.");
  }
});

renderBag();