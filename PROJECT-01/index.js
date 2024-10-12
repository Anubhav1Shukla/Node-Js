const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const mongoose = require("mongoose");

const PORT = 8001;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Developersdata')
  .then(() => console.log("MongoDB Connected Successfully!!"))
  .catch((err) => console.log("Mongo Error: " + err));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
},{timestamps:true});

// Model
const User = mongoose.model("user", userSchema);

// Middleware - Body parser for form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Middleware - Body parser for JSON
app.use(express.json());  // Add this line to parse JSON request bodies

// Custom middleware
// app.use((req, res, next) => {
//     console.log("Hello From Middleware 1");
//     next();
// });

// Routes
app.get('/users', async (req, res) => {
    const allDbUsers=await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// REST API
app.get('/api/users',async (req, res) => {
    const allDbUsers=await User.find({});

    //custom header
    // res.setHeader("X-MyName", "Anubhav");
    return res.json(allDbUsers);
});

app.route('/api/users/:id').get(async(req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    const user=await User.findById(req.params.id)
    if(!user) 
        return res.json(404).json({error: "user not found"});
    return res.json(user);
    
}).patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName:"Changed"});
    return res.json({status: "Success"});
}).delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "Success"});
});

// POST route for creating a new user
app.post("/api/users", async (req, res) => {
    const body = req.body;
    
    // Check if all required fields are present
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_Title) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        // Save new user in MongoDB
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_Title,
        });
        console.log("result: "+result);
        return res.status(201).json({ msg: "Success", data: result });
    } catch (error) {
        return res.status(500).json({ msg: "Error creating user", error });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
