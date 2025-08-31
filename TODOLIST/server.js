const express = require("express"); //importing express

const connectDb = require("./db"); //import connectDb method from db.js file.
connectDb(); //connecting database

const Todo = require("./todoschema");

const app = express(); //assigning express to constant called app
const PORT = 3000; //assigning port, we use this in last app.listen to start the server
app.use(express.json());

let todos = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
    priority: "high",
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

// To get all todo items //db connected
app.get("/todos", async (req, res) => {
  //optionally can omit parantheses aswell.
  const todos = await Todo.find();
  res.json(todos);
});

// Get todo by Id
app.get("/todo/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const todo = todos.find((todo) => todo.id == taskId); //one line arrow function ,can use parantheses after arrow if needed!
  res.status(200).json(todo);

  // for ( i = 0; i < todos.length; i++) {
  //       const todo = todos[i];
  //       if (todo.id == taskId) {
  //           res.status(200).json(todo);
  //       }
  //   }
});

// Add todo //db connected
app.post("/todo", async (req, res) => {
  const newTodo = await Todo.create(req.body);
  res.status(200).json({
    message: "Todo Created Successfully",
    data: newTodo,
  });
});

//update todo
app.put("/todo/update", (req, res) => {
  const { id, title, completed } = req.body;

  const todo = todos.find((t) => t.id == id);
  if (!todo) {
    return res.status(404).send("Todo not found");
  }
  todo.name = title;
  todo.priority = completed;
  res.status(200).send("Updated successfully");
});

//delete todo
app.delete("/todo/delete", (req, res) => {
  const { id } = req.body;
  const exist = todos.some((todo) => todo.id == id);
  if (!exist) {
    res.status(404).send("task not found");
  }
  todos = todos.filter((t) => t.id != id);
  res.status(200).send("Deleted successfully");
});

//starting the server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
