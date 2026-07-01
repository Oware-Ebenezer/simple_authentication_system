require("dotenv").config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require("./routes/auth")

const app =express();
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes)

const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send("Authentication Server is running");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})