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
  const { firstName, lastName, email, password } = req.body;

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
          [firstName, lastName, email, hashedPassword],
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
      success: false,
      message: "Server error.",
    });
  }
});

// SignIn Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Database Error.",
        });
      }
      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Login Successful",
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        },
      });
    },
  );
});
module.exports = router;
