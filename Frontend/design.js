document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const successMsg = document.getElementById("successMsg");

    // Reset messages
    emailError.textContent = "";
    passwordError.textContent = "";
    successMsg.textContent = "";

    let isValid = true;

    // EMAIL VALIDATION
    if (email === "") {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!email.includes("@")) {
      emailError.textContent = "Enter a valid email";
      isValid = false;
    }

    // PASSWORD VALIDATION
    if (password === "") {
      passwordError.textContent = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      isValid = false;
    }

    // Stop if invalid
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        successMsg.textContent = "Login successful! Redirecting...";

        localStorage.setItem("userEmail", email);

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        passwordError.textContent = data.message || "Invalid credentials";
      }

    } catch (error) {
      console.error("Error:", error);
      successMsg.textContent = "Server error. Please try again.";
    }
  });
});