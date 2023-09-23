const express = require('express')
const cors = require('cors')

//server banaya
const app = express()

//conver json to raw
app.use(express.json())


//route imports
const user = require('./routes/userRoute')


app.use("/api/v1",user.router)

//middle ware to pass json data
app.use(express.json())
app.use(cors())


module.exports = app;