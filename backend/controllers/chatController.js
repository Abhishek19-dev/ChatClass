const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Chat = require('../models/chatModel');
const User = require("../models/userModel");


//if chat exists open it OR if chat does not exists create it with user
exports.accessChats = catchAsyncError(async(req,res,next)=>{
    const {userId} = req.body;

    if(!userId)
    {
        return(next(new ErrorHandler("Please enter the userId",400)))
    }
   
    var isChat = await Chat.find({
        isGroupChat : false,
        $and:[
            {users: {$elemMatch: {$eq : req.user._id}}},
            {users: {$elemMatch: {$eq : userId}}},

        ]
    }).populate("users","-password").populate("latestMessage");

    isChat = await User.populate(isChat,{
        path : "latestMessage.sender",
        select : "name pic email"
    })
    //chat check
    if(isChat.length > 0){
        res.status(200).json({
            success : true,
            fullChat : isChat[0]
        })
    }
    else{
        var charData = {
         chatName : "Sender",
         isGroupChat : false,
         users : [req.user.id , userId]
        }
            const createdChat = await Chat.create(charData)
            const fullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password")
            res.status(200).json({
                success:true,
                fullChat
            })
    }
})


//fetch all the chats of user:-
exports.fetchAllChats = catchAsyncError(async(req,res,next)=>{
    // console.log("req-user",req.user.id)
    var allChats = await Chat.find({users : {$elemMatch : {$eq:req.user.id}}}).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt:-1})
    allChats = await User.populate(allChats,{
        path : "latestMessage.sender",
        select : "name pic email"
    })

    // console.log(allChats)
    if(allChats.length == 0)
    {
        return (next(new ErrorHandler("No chats Yet",402)))
    }
    res.status(200).json({
        success:true,
        allChats
    })

})


//create group chats:-
exports.createGroupChat = catchAsyncError(async(req,res,next)=>{
    var {users,chatName,groupDescription} = req.body
    // console.log("users",users)
    // console.log("chatName",chatName)
    if(!req.body.users || !req.body.chatName)
    {
        return (next(new ErrorHandler("Please fill all the Fields !",400)))
    }
    var users = JSON.parse(users)
    if(users.length < 2){
        return (next(new ErrorHandler("More than two people are required to form a group chat ",400)))
    }
    users.push(req.user)
    const groupChat = await Chat.create({
        chatName : chatName,
        users : users,
        isGroupChat : true,
        groupDescription : groupDescription,
        groupAdmin : req.user
    })
    //group Chat banne ke baad usse bhejenge:-
    const fullGroupChat = await Chat.findOne({_id : groupChat._id}).populate("users","-password").populate("groupAdmin","-password")
    res.status(200).json({
        success:true,
        message:"Group Chat Created Successfully",
        fullGroupChat
    })
    
})

//Rename a group:-
exports.renameGroup = catchAsyncError(async(req,res,next)=>{
    const {chatId , newChatName} = req.body
    if(!chatId || !newChatName){
        return(next(new ErrorHandler("Please Enter All fields",200)))
    }
    var updatedGroupChat = await Chat.findByIdAndUpdate(chatId,{
        chatName:newChatName
    },{
        new : true //isko isiliye krte hai taaki humei new valure dikhe
    }).populate("users","-password").populate("groupAdmin","-password")

    res.status(200).json({
        success:true,
        updatedGroupChat
    })

})

//Add Users To group :-
exports.addToGroup = catchAsyncError(async(req,res,next)=>{
    const {chatId , userId} = req.body

    const newMember = await Chat.findByIdAndUpdate(chatId , {
        $push :{users : userId}
    },{
        new : true
    }).populate("users","-password").populate("groupAdmin","-password")
    res.status(200).json({
        success : true,
        message : "User Added Successfully",
        newMember
    })
})

//Remove From Group :-
exports.removeFromGroup = catchAsyncError(async(req,res,next)=>{
    const {chatId , userId} = req.body

    const removedMember = await Chat.findByIdAndUpdate(chatId , {
        $pull :{users : userId}
    },{
        new : true
    }).populate("users","-password").populate("groupAdmin","-password")
    res.status(200).json({
        success : true,
        message : "User Removed Successfully",
        removedMember
    })
})