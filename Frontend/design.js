document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  

  // Prevent logged-in user from accessing login page
  if (currentPage.includes("login.html")) {
    if (localStorage.getItem("isLoggedIn")) {
      window.location.href = "dashboard.html";
      return;
    }
  }

  const form = document.getElementById("loginForm");

  

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success == true) {
        // Save login state
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        alert("Login successful");

        window.location.href = "dashboard.html";
      }
      else {
          alert("Invalid credentials");
        }
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  });
});