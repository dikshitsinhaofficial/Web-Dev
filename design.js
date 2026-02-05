// script.js

const form = document.querySelector("form");

const emailInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const successMsg = document.getElementById("successing");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset messages & styles
    emailError.textContent = "";
    successMsg.textContent = "";
    emailInput.style.border = "1px solid #ddd";
    passwordInput.style.border = "1px solid #ddd";

    let isValid = true;

    // Email validation
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        emailError.textContent = "Email is required";
        emailInput.style.border = "2px solid red";
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Enter a valid email address";
        emailInput.style.border = "2px solid red";
        isValid = false;
    } else {
        emailInput.style.border = "2px solid green";
    }

    // Password validation
    const passwordValue = passwordInput.value.trim();

    if (passwordValue === "") {
        passwordInput.style.border = "2px solid red";
        isValid = false;
    } else if (passwordValue.length < 6) {
        passwordInput.style.border = "2px solid red";
        isValid = false;
    } else {
        passwordInput.style.border = "2px solid green";
    }

    // Success message
    if (isValid) {
        successMsg.textContent = "Login successful!";
        successMsg.style.backgroundColor = "#eaffea";
        successMsg.style.color = "green";

        // Enable this when backend is ready
        // form.submit();
    }
});
