const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const mongoose = require("mongoose");

const PORT = 8001;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Developersdata')
  .then(() => console.log("MongoDB Connected Successfully!!"))
  .catch((err) => console.log("MongoDB Error: " + err));

// Schema
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
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
app.use((req, res, next) => {
    console.log("Hello From Middleware 1");
    next();
});

// Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// REST API
app.get('/api/users', (req, res) => {
    res.setHeader("X-MyName", "Anubhav");
    return res.json(users);
});

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
    
}).put((req, res) => {
    return res.json({status: "Pending.."});
}).delete((req, res) => {
    return res.json({status: "Pending.."});
});

// POST route for creating a new user
app.post("/api/users", async (req, res) => {
    const body = req.body;
    
    // Check if all required fields are present
    if (!body || !body.fname || !body.lname || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        // Save new user in MongoDB
        const result = await User.create({
            fname: body.fname,
            lname: body.lname,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,
        });

        return res.status(201).json({ msg: "Success", data: result });
    } catch (error) {
        return res.status(500).json({ msg: "Error creating user", error });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
