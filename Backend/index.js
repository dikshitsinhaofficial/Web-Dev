const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hii bro how are you");
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Correct validation
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    if (email === "dikshitsinha186@gmail.com" && password === "@qwerty45678") {
        return res.json({
            success: true,
            message: "Login successful",
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid email and password",
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});