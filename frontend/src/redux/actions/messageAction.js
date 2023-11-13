import { ALL_MESSAGES_FAIL, ALL_MESSAGES_REQUEST, ALL_MESSAGES_SUCCESS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "../actionType"
import axios from 'axios'

export const sendMessageAction = (newMessage , selectedChat,socket,setNewMessage) =>async(dispatch)=>{
    try {
     dispatch({
         type: SEND_MESSAGE_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.post("/api/v1/message/send",{content:newMessage , chatId : selectedChat._id},config)
      dispatch({
          type : SEND_MESSAGE_SUCCESS,
          payload : data
      })
      socket.emit("new message",data)
      dispatch(allMessagesAction(selectedChat))
      
    } catch (error) {
        dispatch({
         type : SEND_MESSAGE_FAIL,
         payload:error.response
        })
    }
 }


 //get all chats
 export const allMessagesAction = (selectedchat) =>async(dispatch)=>{
    // console.log("selectedChatId",selectedchat._id)
    try {
     dispatch({
         type: ALL_MESSAGES_REQUEST
      })
      const {data} = await axios.get(`/api/v1/message/${selectedchat._id}`)
    //   console.log("messages data hehe",data)
      dispatch({
          type : ALL_MESSAGES_SUCCESS,
          payload : data
      })
    } catch (error) {
        dispatch({
         type : ALL_MESSAGES_FAIL,
         payload:error.response
        })
    }
 }