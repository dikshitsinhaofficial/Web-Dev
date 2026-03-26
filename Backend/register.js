document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".formcont");
    const nameInput = document.querySelector(".name");
    const emailInput = document.querySelector(".email");
    const passInput = document.querySelector(".pass");
    const tmc = document.querySelector("#tmc");
    const toast = document.querySelector("#rj-tost");

    // 🔥 SUBMIT FORM
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const pass = passInput.value.trim();

        // ✅ VALIDATIONS
        if (!name || !email || !pass) {
            return showToast("All fields are required", "error");
        }

        if (!validateEmail(email)) {
            return showToast("Invalid email format", "error");
        }

        if (pass.length < 6) {
            return showToast("Password must be at least 6 characters", "error");
        }

        if (!tmc.checked) {
            return showToast("Accept Terms & Conditions", "error");
        }

        const user = { name, email, pass };

        try {
            showToast("Creating account...", "loading");

            const res = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            if (data.success) {
                showToast(data.message || "Signup successful", "success");

                // Save login state
                localStorage.setItem("raj:auth", "true");

                // clear form
                form.reset();

                // redirect
                setTimeout(() => {
                    window.location.href = "/frontend/index.html";
                }, 1200);

            } else {
                showToast(data.message || "Signup failed", "error");
            }

        } catch (err) {
            console.error(err);
            showToast("Server error. Try again.", "error");
        }
    });

    // 🔥 EMAIL VALIDATION
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // 🔥 TOAST SYSTEM
    function showToast(message, type) {
        toast.innerHTML = `<p>${message}</p>`;

        // Reset classes
        toast.className = "";

        if (type === "success") {
            toast.style.background = "#2f5d2f";
        } else if (type === "error") {
            toast.style.background = "#c0392b";
        } else {
            toast.style.background = "#555";
        }

        toast.classList.add("show");

        if (type !== "loading") {
            setTimeout(() => {
                toast.classList.remove("show");
                toast.classList.add("close");
            }, 3000);
        }
    }

});