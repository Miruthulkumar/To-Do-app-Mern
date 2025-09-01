const express = require("express"); //importing express

const connectDb = require("./db"); //import connectDb method from db.js file.
connectDb(); //connecting database

//importing schema from todoschema.js file
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

// Get todo by Id //local dummy data only
// app.get("/todo/:taskId", (req, res) => {
//   const taskId = req.params.taskId;
//   const todo = todos.find((todo) => todo.id == taskId); //one line arrow function ,can use parantheses after arrow if needed!
//   res.status(200).json(todo);
// });

// Get todo by Id (from DB instead of local array)
// Define a GET API endpoint at "/todo/:taskId"
// ":taskId" means this part of the URL is dynamic, e.g. /todo/12345
app.get("/todo/:taskId", async (req, res) => {
  try {
    // Extract "taskId" from the URL and use it to find a Todo in MongoDB by its ID
    // Example: if URL is /todo/66d3f4..., req.params.taskId = "66d3f4..."
    const todo = await Todo.findById(req.params.taskId);

    // If no todo is found with that ID, return a 404 "Not Found" response
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // If found, send the todo back to the client with status 200 (OK)
    res.status(200).json(todo);
  } catch (error) {
    // If the ID format is invalid (e.g., not a proper MongoDB ObjectId),
    // or any error occurs, return a 400 "Bad Request" with an error message
    res
      .status(400)
      .json({ message: "Invalid ID format", error: error.message });
  }
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

//delete todo (db version)
app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    res.status(400).json({ message: "Delete failed", error: error.message });
  }
});

//starting the server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
