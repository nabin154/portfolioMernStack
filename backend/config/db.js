const mongoose= require("mongoose");
const colors = require("colors");

const URI = "mongodb://localhost:27017/portfolio";
const connectDB =async ()=>{



try {
  const conn =await mongoose.connect(URI);
if (conn){
    console.log("MongoDB connected SuccessFully ".bgBlue.bold);
}
else{
    console.log("mongodb connection failed".red);
}
} catch (error) {
   console.log("error connecting the database".red); 
}

}

module.exports = connectDB;