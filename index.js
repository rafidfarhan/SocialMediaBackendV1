const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet= require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path"); 

dotenv.config();

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 3002
app.listen(PORT,()=>{
    console.log("Server is running")
})