const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const getDataUri = require('../utils/datauri')
const sendToken = require('../utils/jwtToken')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/ErrorHandler')
const cloudinary = require('cloudinary').v2

//register a user
exports.registerUser =  catchAsyncError(async(req,res,next)=>{

    // const {name , email , password , confirmPassword , avatar} = req.body;
    const {name , email , password , confirmPassword} = req.body;
    const file = req.file
     
    

    const fileUri = getDataUri(file)
    const myCloud = await cloudinary.uploader.upload(fileUri.content,{
        folder:"ChatClassImagesAvatar",
        width:150,
        crop:"scale"
    })

   
   if(password !== confirmPassword){
    return (next(new ErrorHandler("password and Confirm Password does not match",400)))
   }

    const user = await User.create({
        name,email,password,confirmPassword,
        avatar :{
            public_id : myCloud.public_id,
            url : myCloud.secure_url,
            // public_id : avatar.public_id,
            // url : avatar.url
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

//Logout a User:-
exports.LogoutUser = catchAsyncError(async(req,res,next)=>{
   await res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly : true
    })
    res.status(200).json({
        success:true,
        message:"LOGGED OUT SUCCESSFULLY !"
    })
})


//Get All Users:-
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
        success:true,
        users : users
    })
})

//Search one user:-
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const keyword = req.query.search ? { //uske name and email mei dhundenge
     $or : [
        {name : {$regex : req.query.search , $options: "i"}}, // i means case sensitive
        {email : {$regex : req.query.search , $options: "i"}},
     ]
    }:{}
   const users = await User.find(keyword).find({_id : {$ne : req.user._id}})
   res.status(200).json({
    success:true,
    users : users
   })
    // console.log(keyword)

})