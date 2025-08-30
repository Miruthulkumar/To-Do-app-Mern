const express = require("express");
const app = express();
const PORT = 2000;

//to get all todo items
app.get("/todos", (req, res) => {
  res.json([
    {
      task: "Go to Gym",
      priority: "HIGH",
    },
    {
      task: "Water Plants",
      priority: "HIGH",
    },
    {
      task: "Do Homework",
      priority: "LOW",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`The server is running in ${PORT}`);
});
