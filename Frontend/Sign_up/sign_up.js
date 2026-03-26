document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".formcont");
    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const pass = document.querySelector(".pass");
    const tmc = document.querySelector("#tmc");
    const toast = document.querySelector("#rj-tost");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 🔴 VALIDATION
        if (!name.value.trim() || !email.value.trim() || !pass.value.trim()) {
            return useToast(1, "All fields are required");
        }

        if (!tmc.checked) {
            return useToast(1, "Please accept Terms & Conditions");
        }

        const user = {
            name: name.value.trim(),
            email: email.value.trim(),
            pass: pass.value.trim()
        };

        try {
            useToast(2, "Creating account...");

            const res = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            // 🔴 HANDLE BAD RESPONSE
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Signup failed");
            }

            const data = await res.json();

            // ✅ SUCCESS
            localStorage.setItem("raj:auth", "true");
            useToast(0, data.message || "Signup successful");

            // ✅ CLEAR FORM (FIXED)
            form.reset();

            // ✅ REDIRECT
            setTimeout(() => {
                window.location.href = "/frontend/index.html";
            }, 1200);

        } catch (err) {
            console.error(err);
            useToast(1, err.message || "Server error");

            // ❗ OPTIONAL: clear even on error
            // form.reset();
        }
    });

    const useToast = (mode, message) => {
        toast.innerHTML = `<p>${message}</p>`;

        // reset classes
        toast.className = "";

        // 0 = success, 1 = error, 2 = loading
        if (mode === 0) toast.style.background = "#2f5d2f";
        if (mode === 1) toast.style.background = "#c0392b";
        if (mode === 2) toast.style.background = "#555";

        toast.classList.add("show");

        if (mode !== 2) {
            setTimeout(() => {
                toast.classList.remove("show");
                toast.classList.add("close");
            }, 3000);
        }
    };

});