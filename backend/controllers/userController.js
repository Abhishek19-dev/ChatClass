const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const getDataUri = require('../utils/datauri')
const sendToken = require('../utils/jwtToken')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/ErrorHandler')

//register a user
exports.registerUser =  catchAsyncError(async(req,res,next)=>{

    const {name , email , password , confirmPassword , avatar} = req.body;
    // const {file} = req.body;
    // console.log("file",file)
    // console.log("name",name)
    // console.log("password",password)
    // console.log("confirm",confirmPassword)
    // console.log("email",email)

    // const fileUri = getDataUri(file)
    // const myCloud = await cloudinary.uploader.upload(fileUri.content,{
    //     folder:"ChatClassImagesAvatar",
    //     width:150,
    //     crop:"scale"
    // })

   
   if(password !== confirmPassword){
    return (next(new ErrorHandler("password and Confirm Password does not match",400)))
   }

    const user = await User.create({
        name,email,password,confirmPassword,
        avatar :{
            // public_id : myCloud.public_id,
            // url : myCloud.secure_url,
            public_id : avatar.public_id,
            url : avatar.url
        }
    })
    
    sendToken(user , 200 ,res)
})


//Login a User :-
exports.LoginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body
   

    if(!email && !password)
    {
        return (next(new ErrorHandler("Enter email and Password")))
    }
    const user = await User.findOne({"email":email}).select("+password")
   
    const isPasswordMatched = await user.comparePassword(password)
    if(!user){
        return(next(new ErrorHandler("User Is not registered")))
    }
    if(!isPasswordMatched)
    {
        return(next(new ErrorHandler("Invalid Email And Password",400)))
    }
    sendToken(user,200,res)
})