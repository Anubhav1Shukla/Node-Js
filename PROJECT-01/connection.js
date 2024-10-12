const mongoose=require("mongoose");



async function connectMongoDb(url) {
    return mongoose.connect(url)
    .then(() => console.log("MongoDB Connected Successfully!!"))
    .catch((err) => console.log("Mongo Error: " + err));
  
}


module.exports={
    connectMongoDb,
}