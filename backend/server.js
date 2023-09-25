
const app = require('./app')
 const cloudinary = require('cloudinary').v2

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


//CLOUDINARY SETUP:-
const CLOUDINARY_NAME = "dvjfrujbp"
const CLOUDINARY_API_KEY = "329414564435998"
const CLOUDINARY_API_SECRET = "x6RJZKQdi5t1PuRS8nC-bTDhEMo"

cloudinary.config({
  cloud_name : CLOUDINARY_NAME,
  api_key : CLOUDINARY_API_KEY,
  api_secret : CLOUDINARY_API_SECRET
})


const port = 8050
// const port = process.env.PORT || 5000

const server = app.listen(port , ()=>{
    console.log(`server is working on http://localhost:${port}`)
})