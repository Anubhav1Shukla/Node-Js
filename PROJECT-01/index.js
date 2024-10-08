const express=require("express");
const fs=require("fs");
const users=require("./MOCK_DATA.json");
const app=express();

const PORT=8000;
//Routes

//Middleware-Plugin

app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log("hello From Middleware 1");
    // return res.json({msg:"Hello from middleware 1"});
    next();
})


app.get('/users',(req,res)=>{
    const html=`
    <ul>
        ${users.map((user)=>`<li>${user.first_name}</li/>`).join("")}
    </ul>
    `;
    res.send(html);
})


//REST API


app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.route('/api/users/:id').get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
      return  res.json(user);
    
}).put((req,res)=>{
    //Edit user with id
   return res.json({status:"Pending.."});
}).delete((res,req)=>{
    //Delete user with id
   return res.json({status:"Pending.."});
});


app.post('/api/users',(req,res)=>{
    //ToDo:create new user
    const body=req.body;
    users.push({...body,id: users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success",id: users.length+1});
    });
   
})



// app.patch('/api/users/:id',(req,res)=>{
   
//     // ToDo:-- Edit the user with id
//       return  res.json({status:"Pending"});
    
// });

// app.delete('/api/users/:id',(req,res)=>{
   
//     // ToDo:-- Delete the user with id
//       return  res.json({status:"Pending"});
    
// });









app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`));



