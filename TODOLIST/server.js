// const express = require("express");
// const app = express();
// const PORT = 2000;

// let todos = [
//   [
//     {
//       id: 1,
//       title: "Buy groceries",
//       completed: false,
//     },
//     {
//       id: 2,
//       title: "Finish project report",
//       completed: true,
//     },
//     {
//       id: 3,
//       title: "Book dentist appointment",
//       completed: false,
//     },
//     {
//       id: 4,
//       title: "Pay electricity bill",
//       completed: true,
//     },
//     {
//       id: 5,
//       title: "Clean the living room",
//       completed: false,
//     },
//     {
//       id: 6,
//       title: "Prepare for presentation",
//       completed: false,
//     },
//     {
//       id: 7,
//       title: "Read a chapter of a book",
//       completed: true,
//     },
//     {
//       id: 8,
//       title: "Go for evening walk",
//       completed: false,
//     },
//     {
//       id: 9,
//       title: "Fix broken chair",
//       completed: false,
//     },
//     {
//       id: 10,
//       title: "Call insurance agent",
//       completed: true,
//     },
//   ],
// ];

// //to get all todo items
// app.get("/todos", (req, res) => {
//   res.status(200).json(todos);
// });

// //to get todo by id
// app.get("/todo/:taskId", (req, res) => {
//   const taskId = req.params.taskId;
//   const todo = todos.find((todo) => todo.id == taskId);
//   res.status(200).json(todo);
// });

// app.listen(PORT, () => {
//   console.log(`The server is running in ${PORT}`);
// });

//nirmal anna's code

const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

let todos = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
  },
  {
    id: 2,
    title: "Finish project report",
    completed: true,
  },
  {
    id: 3,
    title: "Book dentist appointment",
    completed: false,
  },
  {
    id: 4,
    title: "Pay electricity bill",
    completed: true,
  },
  {
    id: 5,
    title: "Clean the living room",
    completed: false,
  },
  {
    id: 6,
    title: "Prepare for presentation",
    completed: false,
  },
  {
    id: 7,
    title: "Read a chapter of a book",
    completed: true,
  },
  {
    id: 8,
    title: "Go for evening walk",
    completed: false,
  },
  {
    id: 9,
    title: "Fix broken chair",
    completed: false,
  },
  {
    id: 10,
    title: "Call insurance agent",
    completed: true,
  },
];

// To get all todo items
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Get todo by Id
app.get("/todo/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const todo = todos.find((todo) => todo.id == taskId);
  res.status(200).json(todo);
});

// Add todo
app.post("/todo", (req, res) => {
  todos = [...todos, req.body];
  res.status(200).send("Todo created successfully.");
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
