require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Hike = require('../models/Hikes');
const Comment = require('../models/Comments');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  console.log('Authenticating...');
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).json({ message: "Token is not valid" });
    }
    req.user = decoded.id;
    console.log('JWT verified:', decoded);
    next();
  });
};

// Routes that require authentication
router.use('/hikes', authMiddleware);
router.use('/hikes/:hikeId/comments', authMiddleware);

// POST /api/auth/login
router.post('/login', async (req, res) => {
  console.log('Login request:', req.body);
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      console.log('Login failed: Username or password not provided');
      return res.status(400).json({ message: "Both username and password are required." });
    }
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials for:', username);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful:', username);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/register (No authentication required here)
router.post('/register', async (req, res) => {
  console.log('Registration request:', req.body);
  const { firstName, lastName, username, email, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      console.log('User already exists:', username, email);
      return res.status(400).json({ message: 'User already exists with given username or email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ firstName, lastName, username, email, password: hashedPassword });
    await user.save();
    console.log('User registered successfully:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all hikes
router.get('/hikes', async (req, res) => {
  try {
    console.log('Fetching all hikes...');
    const hikes = await Hike.find().populate('comments');
    console.log('Hikes retrieved:', hikes.length);
    res.json(hikes);
  } catch (error) {
    console.error('Error fetching hikes:', error);
    res.status(500).json({ message: error.message });
  }
});

// Post a comment
router.post('/hikes/:hikeId/comments', async (req, res) => {
  console.log('Posting comment:', req.body);
  const { text } = req.body;
  const { hikeId } = req.params;

  try {
    const hike = await Hike.findById(hikeId);
    if (!hike) {
      console.log('Hike not found:', hikeId);
      return res.status(404).json({ message: "Hike not found" });
    }

    const comment = new Comment({ text, hike: hikeId, author: req.user });
    hike.comments.push(comment._id);

    await comment.save();
    await hike.save();

    console.log('Comment posted:', comment);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
