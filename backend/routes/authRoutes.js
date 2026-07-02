const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "fresher@cisco-demo.com" && password === "password123") {
    return res.json({
      token: "mock-jwt-token",
      user: {
        name: "Security Analyst",
        role: "Admin"
      }
    });
  }

  return res.status(401).json({ message: "Invalid email or password" });
});

module.exports = router;