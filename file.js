const fs=require('fs');

//sync... Blocking.....
// fs.writeFile('./test.txt','Hey Anubhav');

//Async...  Non-Blocking....
// fs.writeFile("./test.txt","Hello World Async",(err)=>{});

//Sync:-Ye return karta hai 
// const result=fs.readFileSync("./contact.txt","utf-8");
// console.log(result);



//Async:-ye kuch return nahi karta hai callback accept karta hai hamesa
// const result=fs.readFile("./contact.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err)
//     }else{
//         console.log(result);
//     }
// });


// fs.appendFileSync("./test.txt","You are good boy");
// fs.cpSync("./test.txt","./copy.txt");  //copy one file to another file

// fs.unlinkSync("./copy.txt"); //isase ham file ko delete bhi kar sakte hai


// console.log(fs.statSync("./test.txt")) file statics 

