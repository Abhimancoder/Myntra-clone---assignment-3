function updateAuthLink() {
  const link = document.getElementById("auth-link");
  if (!link) return;

  const name = localStorage.getItem("userName");

  if (name) {
    link.textContent = "Logout (" + name + ")";
    link.href = "#";
    link.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      window.location.reload();
    };
  } else {
    link.textContent = "Login";
    link.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", updateAuthLink);