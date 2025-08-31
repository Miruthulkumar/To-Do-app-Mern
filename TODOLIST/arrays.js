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

//to get by id
function getTodoById(todoId){
    return todos.find(todo=>todo.id == todoId)
}
// console.log(getTodoById(4));



//to get compoelted tasks alone
function completedTasks(){
    return todos.filter(todo=>todo.completed)
}
// console.log(completedTasks());



//to get not completed tasks alone
function notCompletedTasks(){
    return todos.filter(todo=>!todo.completed)
}
// console.log(notCompletedTasks());