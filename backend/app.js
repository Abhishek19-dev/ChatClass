const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')

//server banaya
const app = express()

//conver json to raw
app.use(express.json())


//middleware:-


app.use(cors());

//middleware should be used above routes inports
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
// app.use(fileUpload())
//middle ware to pass json data




//route imports
const user = require('./routes/userRoute')
const chat = require('./routes/chatRoute')



app.use("/api/v1",user.router)
app.use("/api/v1",chat.router)

const { notFound, errorHandler } = require('./middleware/errorMiddleware')
app.use(notFound)
app.use(errorHandler)




module.exports = app;