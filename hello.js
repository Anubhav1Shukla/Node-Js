console.log("Hey there! I am JS");


//Jitni bhi design related word hai vo sab compiler pe  run nahi kar sakte only chrome ke cosole me jaake karna padega aisa nahi hai ki chrome me v8 engine direct use kar liya gya 



// commonds
// node file.js name
// node -v
// node init 

// package.json file ek tarah ki configuration file hai is particular project ka 
// jo bhi dependencies ham install karnge ya jab bhi ham isko publish karenge aur run karenge to sarra package.json file me hoga 

//Window objects available nahi hai


const {add,sub}=require("./math")//require ka use tab karte hai jab ham code kisi aur file me likha ho aur use kisi aur file se call karna ho

//Destructing use kar sakte hai jab ek se adhik function ko import karna ho

console.log(add(4,6));
console.log(sub(4,6));