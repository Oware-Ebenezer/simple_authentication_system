const express = require("express");
const router = express.Router();

const db = require("../config/db");
const bcrypt = require("bcrypt");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Authentication routes running",
  });
});

//SignUp route
router.post("/signup", (req, res) => {
  const { firstname, lastname, email, password } = req.body;


  try {
    db.query(
      "SELECT id FROM users WHERE email=?",
      [email],
      async (error, results) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }
        if (results.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already exists.",
          });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (first_name, last_name, email,password) VALUES (?,?,?,?)",
          [firstname, lastname, email, hashedPassword],
          (error, resutl) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "Could not register user.",
              });
            }
            res.status(201).json({
              success: true,
              message: "Account created successfully.",
            });
          },
        );
      },
    );
  } catch (err) {
    res.status(500).json({
        success:false,
        message: "Server error."
    })
  }
});

module.exports = router;
