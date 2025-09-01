const mongoose = require("mongoose");

//schema creation . the format we use to defin this schema is json.json is key value pair.
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
});

//exporting this schema to server.js file
module.exports = mongoose.model("Todo", todoSchema);
