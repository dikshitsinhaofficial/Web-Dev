document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formcont");
    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const pass = document.querySelector(".pass");
    const tmc = document.querySelector("#tmc");
    const toast = document.querySelector("#rj-tost");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!tmc.checked) {
            useToast(1, "Please accept Terms & Conditions");
            return;
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

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("raj:auth", "true");
                useToast(0, data.message || "Signup successful");

                setTimeout(() => {
                    window.location.href = "/frontend/index.html";
                }, 1200);
            } else {
                useToast(1, data.message || "Signup failed");
            }

        } catch (err) {
            useToast(1, "Server error. Try again later.");
            console.error(err);
        }
    });

    const useToast = (mode, message) => {
        toast.innerHTML = `<p>${message}</p>`;

        // 0 = success, 1 = error, 2 = loading
        if (mode === 0) toast.style.background = "#2f5d2f";
        if (mode === 1) toast.style.background = "#c0392b";
        if (mode === 2) toast.style.background = "#555";

        toast.classList.remove("close");
        toast.classList.add("show");

        if (mode !== 2) {
            setTimeout(() => {
                toast.classList.remove("show");
                toast.classList.add("close");
            }, 3000);
        }
    };
});