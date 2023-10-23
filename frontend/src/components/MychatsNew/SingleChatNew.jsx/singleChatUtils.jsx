 import React from 'react'; 
 
 export const upperMessageSame = () =>{
return (
    <>
    
    </>
)
};

export const messageSender = ({message , user}) =>{
    console.log("message sender ._id",message.sender._id)
    return true
    //  return message.sender._id === user._id ? true : false
}
 
