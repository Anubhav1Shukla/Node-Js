
const User=require('../models/user')

async function handleGetAllUsers(req,res) {
    const allDbUsers=await User.find({});

    //custom header
    // res.setHeader("X-MyName", "Anubhav");
    return res.json(allDbUsers);
    
}

async function handleGetUserById(req,res) {
    const user=await User.findById(req.params.id)
    if(!user) 
        return res.json(404).json({error: "user not found"});
    return res.json(user);
} 


async function handleUpdateUserbyId(req,res) {
    await User.findByIdAndUpdate(req.params.id, {lastName:"Changed"});
    return res.json({status: "Success"});
    
}

async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "Success"});
}

async function handleCreateNewUser(req,res){
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
        return res.status(201).json({ msg: "Success", data: result });
    } catch (error) {
        return res.status(500).json({ msg: "Error creating user", error });
    }
}






module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserbyId,
    handleDeleteUserById,
    handleCreateNewUser,
}