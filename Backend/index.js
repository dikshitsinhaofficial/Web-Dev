const express = require('express');
const cors = require('cors');

const app=express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);   
});
middleware cors origin resource theory