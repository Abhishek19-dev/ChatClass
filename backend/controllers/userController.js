const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const getDataUri = require('../utils/datauri')
const sendToken = require('../utils/jwtToken')
const catchAsyncError = require('../middleware/catchAsyncError')
const validator = require('validator');
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
    const {name,password} = req.body

    if(!name && !password)
    {
        return (next(new ErrorHandler("Enter name and Password")))
    }
    const user = await User.findOne({"name":name}).select("+password")
    

    if(!user){
        return(next(new ErrorHandler("User Is not registered")))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched)
    {
        return(next(new ErrorHandler("Invalid name And Password",400)))
    }
    if(user){
        user.isOnline = true
    }
    sendToken(user,200,res)
})

//Logout a User:-
exports.LogoutUser = catchAsyncError(async(req,res,next)=>{
   await res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly : true
    })
    req.user.isOnline = false
    res.status(200).json({
        success:true,
        message:"LOGGED OUT SUCCESSFULLY !"
    })
})


//Get All Users:-
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    // const usersArray = await User.find()
    const users = await User.find()
    // const users = usersArray.filter((user)=> user._id != req.user.id)
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

   const users = await User.find(keyword).find({_id : {$ne : req.user.id}})
   res.status(200).json({
    success:true,
    users : users
   })
    // console.log(keyword)

})

//Get Login User Details
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
   
    const user = await User.findById(req.user.id)
    
    if(!user){
        return (next(new ErrorHandler("No user Found",400)))
    }

   
   res.status(200).json({
    success:true,
    userDetails:user
   })

})



//Edit description
exports.editDescriptionUser = catchAsyncError(async(req,res,next)=>{
    console.log("req user id",req.user.id)
    const {description} = req.body
    const editUser = await User.findByIdAndUpdate(req.user._id , {
        description : description
    },{ new: true })

    if(!editUser){
        return (next (new ErrorHandler("Not Updated Description",400)))
    }

    // User.save()

    res.status(200).json({
        success:true,
        editUser
    })
})


exports.editProfile = catchAsyncError(async(req,res,next)=>{
    console.log("req user id",req.user.id)
    const {email , Location} = req.body
    const editUser = await User.findByIdAndUpdate(req.user._id , {
        email : email,
        Location : Location
    },{ new: true })


     // Check if the email is valid
     if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Please enter a valid email", 400));
    }

    
    if(!editUser){
        return (next (new ErrorHandler("Not Updated Description",400)))
    }

    // User.save()

    res.status(200).json({
        success:true,
        editUser
    })
})