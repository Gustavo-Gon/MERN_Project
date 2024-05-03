require('dotenv').config();

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB.");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Additional application setup can go here
    // E.g., app.get(), app.post() route handlers that use the MongoDB client

  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

main().catch(console.error);

process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});