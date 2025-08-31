const mongoose = require("mongoose");

//function to connect to database.
async function connectDb() {
  const connection = await mongoose.connect(
    "mongodb+srv://miruthul:IyLBTWLHTjq9BGmc@cluster0.avtwclw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}

//exporting the db file to serverfile.
module.exports=connectDb
