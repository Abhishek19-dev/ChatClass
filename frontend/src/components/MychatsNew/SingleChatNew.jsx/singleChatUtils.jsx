 import React from 'react'; 
 


export const messageSender = ({message , user}) =>{
    console.log("message sender ._id",message.sender._id)
    return true
    //  return message.sender._id === user._id ? true : false
}
 
export const sameSenderMessageForSingleChat = (messages , index , message , user) =>{
    const sameSenderMessage =
    index >= 0 &&
    index < messages.length - 1 &&
    messages[index].sender._id ===
      messages[index + 1].sender._id
  return message.sender._id === user._id 

}

export const sameMessageSender = (messages , index)=>{
 return (
    index >= 0 &&
    index < messages.length - 1 &&
    messages[index].sender._id ===
      messages[index + 1].sender._id
 )
}