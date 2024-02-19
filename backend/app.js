const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require('path');

// Server created
const app = express();

// Convert JSON to raw
app.use(express.json());
const __directoryName = path.resolve(); // Declaration moved here

// Middleware
// app.use(cors({
//     origin:["http://localhost:3000"],
//     methods:["POST","GET"],
//     credentials:true
// }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

// Deployment


// Route imports
const user = require('./routes/userRoute');
const chat = require('./routes/chatRoute');
const message = require('./routes/messageRoute');

app.use("/api/v1", user.router);
app.use("/api/v1", chat.router);
app.use("/api/v1", message.router);

// Static files serving
app.use(express.static(path.join(__directoryName , "/frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "frontend","build","index.html"));
});

// Error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

module.exports = app;