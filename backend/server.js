require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Use mongoose instead of the MongoDB client
const authRoutes = require('./routes/auth'); // Ensure this path is correct

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes

const uri = process.env.MONGODB_URI;

// Connecting to MongoDB using Mongoose
mongoose.connect(uri)
.then(() => {
  console.log("Successfully connected to MongoDB.");
  // Only start the server if the DB connection is successful
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch(err => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);  // Exit if the database connection fails
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});

module.exports = app;