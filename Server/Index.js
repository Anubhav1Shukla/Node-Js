const http=require("http");
const fs=require('fs');
const url=require("url");
const { transferableAbortController } = require("util");
const myServer=http.createServer((req,res)=>{
    if(req.url==="/favicon.ico") return res.end();
    const log=`${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
    const myUrl=url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myUrl.pathname){
            case "/":
                if(req.method==="GET") return res.end("You are in home page");
                break;
            case "/about":
                const username=myUrl.query.myname;
                res.end(`Hi, ${username}`);
                // res.end("Hey! I am Anubhav here.");
                break;

            case "/search":
                const search=myUrl.query.search_query;
                res.end("Here is your Searching content "+search);
            case "/signup":
                if(req.method==="GET")  res.end("This is a singup Form");
                else if(req.method=="POST"){
                    //DB query
                    res.send("Success");
                } 
            default:
                res.end("404 Not Found!")
        }
    })
   
});

myServer.listen(8000,()=> console.log("Server Started......"));




// URl--->Uniform Resource Locator

// Protocal
// hypertext
// transfer
// Protocal
// secure