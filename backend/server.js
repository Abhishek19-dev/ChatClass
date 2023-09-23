const app = require('./app')
// const dotenv = require('dotenv')



//dot env setup
// dotenv.config()

//mongoose connection
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://AbhishekPadiyar:ripperpubg1234@cluster0.dimd4wk.mongodb.net/ChatClass",{
    useNewUrlParser: true,
  });
  console.log("database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



app.get("/",(req,res)=>{
    res.send("api is running")
})

const port = 8050
// const port = process.env.PORT || 5000

const server = app.listen(port , ()=>{
    console.log(`server is working on http://localhost:${port}`)
})