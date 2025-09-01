// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Schema creation: defining the structure of the todo documents in the database.
// We use mongoose.Schema to create a blueprint for the todo items.
// This schema acts like a JSON object specifying the keys and their value types.
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
});

// Exporting the schema as a Mongoose model named "Todo".
// This allows other files (like server.js) to import and use this model to interact with the todos collection in MongoDB.
module.exports = mongoose.model("Todo", todoSchema);
