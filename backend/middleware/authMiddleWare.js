const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const asyncHandle = require("express-async-handler")
const catchAsyncError = require("./catchAsyncError")
const ErrorHandler = require("../utils/ErrorHandler")

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies
    if(!token)
    {
        return (next (new ErrorHandler("Please Login to access this feature",401)))
    }
    if(token)
    {
        const JWT_SECRET = "KJGFSDJKGJFDLKGJHFOIAHJSFKAJHKAJ"
        const decodedData = jwt.verify(token,JWT_SECRET)
        // console.log(decodedData.id)
        req.user = await User.findById(decodedData.id)
        // console.log(req.user)
        next()
    }
})
