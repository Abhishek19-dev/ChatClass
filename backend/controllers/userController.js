const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../middleware/generateToken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');


//register a user
exports.registerUser = catchAsyncError(async(req,res,next) =>{
    const {name , email , password , confirmPassword , pic} = req.body;

    if(!name || !email || !password || !confirmPassword)
    {
        res.status(400);
        // throw new Error("Please enter all the fields")
        return(next(new ErrorHandler("Please enter all the fields")))
    }

    const userExits = await User.findOne({email})
    if(userExits)
    {
        res.status(400);
       return (next(new ErrorHandler("User Email already Exits",400)))
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    })
    if(user)
    {
        res.status(200).json({
            success:true,
            user,
            token : generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error("Failed to register Your account")
    }
})