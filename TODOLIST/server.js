const express = require("express"); // Importing the Express framework to create the server and handle routing

const connectDb = require("./db"); // Import the connectDb function from the db.js file to establish a database connection
connectDb(); // Call the connectDb function to connect to the MongoDB database

// Import the Todo schema/model from the todoschema.js file to interact with the todos collection in MongoDB
const Todo = require("./todoschema");

const app = express(); // Initialize an Express application and assign it to the constant 'app'
const PORT = 3000; // Define the port number on which the server will listen for incoming requests
app.use(express.json()); // Middleware to parse incoming JSON payloads in request bodies

// Define a local array of todo items as dummy data for initial testing or fallback
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
];

// To get all todo items from the database
// Define a GET API endpoint at "/todos" to fetch all todo documents
app.get("/todos", async (req, res) => {
  // Use the Todo model to asynchronously find all todo documents in MongoDB
  const todos = await Todo.find();
  // Send the array of todos as a JSON response to the client
  res.json(todos);
});

// Get todo by Id from local dummy data only (commented out)
// This shows how to fetch a todo by id from the local 'todos' array instead of the database
// app.get("/todo/:taskId", (req, res) => {
//   const taskId = req.params.taskId; // Extract 'taskId' parameter from the URL
//   const todo = todos.find((todo) => todo.id == taskId); // Find the todo with matching id
//   res.status(200).json(todo); // Send back the found todo as JSON with HTTP status 200 OK
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

// Add a new todo item to the database
// Define a POST API endpoint at "/todo" to create a new todo document
app.post("/todo", async (req, res) => {
  // Use the Todo model to create a new todo document using the data sent in the request body
  const newTodo = await Todo.create(req.body);
  // Send a success message along with the newly created todo data back to the client
  res.status(200).json({
    message: "Todo Created Successfully",
    data: newTodo,
  });
});

// Update an existing todo item in the local array
// Define a PUT API endpoint at "/todo/update" to update a todo
app.put("/todo/update", (req, res) => {
  // Destructure id, title, and completed fields from the request body
  const { id, title, completed } = req.body;

  // Find the todo item in the local 'todos' array that matches the given id
  const todo = todos.find((t) => t.id == id);
  // If no todo is found, send a 404 "Not Found" response
  if (!todo) {
    return res.status(404).send("Todo not found");
  }
  // Update the todo's 'name' property with the new title (note: property should probably be 'title' not 'name')
  todo.name = title;
  // Update the todo's 'priority' property with the completed status (note: this seems incorrect, priority and completed are different)
  todo.priority = completed;
  // Send a success message back to the client
  res.status(200).send("Updated successfully");
});

// Delete a todo item from the database by ID
// Define a DELETE API endpoint at "/todo/delete/:id" to remove a todo document
app.delete("/todo/delete/:id", async (req, res) => {
  try {
    // Use the Todo model to find and delete a todo document by the ID provided in the URL parameter
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    // If no todo is found with that ID, return a 404 "Not Found" response
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // If deletion is successful, send a success message along with the deleted todo data
    res.status(200).json({
      message: "Deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    // If any error occurs during deletion (e.g., invalid ID format), send a 400 "Bad Request" with error details
    res.status(400).json({ message: "Delete failed", error: error.message });
  }
});

app.get('/miruthul',(req,res)=>{
  res.status(200).send("Miruthul work aagudhu da!")
})

// Start the Express server and listen on the specified PORT
app.listen(PORT, () => {
  // Log a message to the console indicating the server is running and listening
  console.log(`Server running at port ${PORT}`);
});


