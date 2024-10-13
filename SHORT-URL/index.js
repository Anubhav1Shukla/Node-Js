const express=require("express")
const urlRoute=require('./routes/url')

const URL=require('./models/url')


const app=express();
const PORT=8000;

const {connectToMongoDB}=require("./connect")

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("Mongodb Connected!"))
.catch((err)=>console.log("Error : "+err));


app.use(express.json())

app.use('/url',urlRoute);

app.get('/:shortId',async (req,res)=>{
        const shortId=req.params.shortId;
        const entry=await URL.findOneAndUpdate({
            shortId,
        },
        {
            $push: {
            visitHistory:{
                  timestamp:Date.now(),
            },
        },
    }
);
res.redirect(entry.redirectURL);
})

app.listen(PORT,()=> console.log(`Server Startded at PORT ${PORT}`))