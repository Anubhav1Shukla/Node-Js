const express = require("express");


const { handleGetAllUsers,handleGetUserById,handleUpdateUserbyId,handleDeleteUserById,handleCreateNewUser } =require('../controllers/user')

// router.get('/', async (req, res) => {
//     const allDbUsers=await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// });

// REST API
const router=express.Router();


router.route('/',handleGetAllUsers)
.get(handleCreateNewUser).post(handleCreateNewUser);

router.route('/:id').get(handleGetAllUsers)
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    .patch(handleUpdateUserbyId)
    .delete(handleDeleteUserById);

// POST route for creating a new user
// router.post("/",handleCreateNewUser);
    
module.exports=router;