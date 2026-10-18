const ordersBox = document.getElementById("orders");

async function loadOrders() {
  const token = localStorage.getItem("token");

  if (!token) {
    ordersBox.innerHTML = '<p>Please <a href="login.html">log in</a> to see your orders.</p>';
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: "Bearer " + token },
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      ordersBox.innerHTML = '<p>Your session expired. Please <a href="login.html">log in</a> again.</p>';
      return;
    }

    const orders = await response.json();

    if (orders.length === 0) {
      ordersBox.innerHTML = "<p>You have no orders yet.</p>";
      return;
    }

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleString();

      const itemsHtml = order.items
        .map(
          (item) => `
            <div class="bag-item">
              <img src="${item.image}" alt="${item.name}" />
              <div class="bag-info">
                <p class="brand">${item.brand}</p>
                <p class="name">${item.name}</p>
                <p class="name">Size: <strong>${item.size || "-"}</strong></p>
                <p class="price">Rs. ${item.price} x ${item.qty}</p>
              </div>
            </div>`
        )
        .join("");

      ordersBox.innerHTML += `
        <div class="order-box">
          <p class="order-date">Ordered on ${date}</p>
          ${itemsHtml}
          <p class="order-total">Total: Rs. ${order.total}</p>
        </div>
      `;
    });
  } catch (err) {
    ordersBox.innerHTML = "<p>Could not load orders. Is the server running?</p>";
  }
}

loadOrders();