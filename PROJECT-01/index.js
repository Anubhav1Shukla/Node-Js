const express = require("express");
const fs = require("fs");
// const users = require("./MOCK_DATA.json");

const {connectMongoDb}=require('./connection');
const {logReqRes}=require('./middlewares/index')

const userRouter=require("./routes/user")

const app = express();
const PORT = 8001;

// MongoDB connection
connectMongoDb('mongodb://127.0.0.1:27017/Developersdata').then(()=> console.log("MongoDb Connected!"))


// Schema


// Middleware - Body parser for form-urlencoded
app.use(express.urlencoded({ extended: false }));


app.use(logReqRes('log.txt'));
// Middleware - Body parser for JSON
app.use(express.json());  // Add this line to parse JSON request bodies

// Custom middleware
// app.use((req, res, next) => {
//     console.log("Hello From Middleware 1");
//     next();
// });

// Routes


//express pahle /user jo check karegi bakki ka jo path hoga vo userRouter ko de degi
app.use('/api/user',userRouter);


// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
