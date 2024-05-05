const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Confirm this path is correct.
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Both username and password are required." });
    }

    // Attempt to find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the submitted password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If password matches, sign the JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    // Return the JWT token and a success message
    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
      // Check if user already exists
      let user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
          return res.status(400).json({ message: 'User already exists with given username or email' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
