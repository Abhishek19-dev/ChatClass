import { ACCESS_CHAT_FAIL, ACCESS_CHAT_REQUEST, ACCESS_CHAT_SUCCESS, ALL_CHATS_OF_USER_FAIL, ALL_CHATS_OF_USER_REQUEST, ALL_CHATS_OF_USER_SUCCESS, SEARCH_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS } from "../actionType"
import axios from 'axios'

//SEARCH A USER:-
export const searchUser = (search) =>async(dispatch)=>{
    try {
     dispatch({
         type: SEARCH_USER_REQUEST
      })
      const {data} = await axios.get(`api/v1/singleUser?search=${search}`)
      console.log(data)
      dispatch({
          type : SEARCH_USER_SUCCESS,
          payload : data.users
      })
    } catch (error) {
        dispatch({
         type : SEARCH_USER_FAIL,
         payload:error.response.message.data
        })
    }
 }

 //Create a chat Or Load a chAT:-
 export const accessChat = (userId) =>async(dispatch)=>{
    console.log("userId",userId)
    try {
     dispatch({
         type: ACCESS_CHAT_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.post("/api/v1/chat",{userId},config)
      console.log("data",data.fullChat)
      dispatch({
          type : ACCESS_CHAT_SUCCESS,
          payload : data.fullChat
      })
      dispatch(getAllChat())
    } catch (error) {
        dispatch({
         type : ACCESS_CHAT_FAIL,
         payload:error.response.message.data
        })
    }
 }

 export const getAllChat = () =>async(dispatch)=>{
   
    try {
     dispatch({
         type: ALL_CHATS_OF_USER_REQUEST
      })
      
      const {data} = await axios.get("/api/v1/allChats")

      dispatch({
          type : ALL_CHATS_OF_USER_SUCCESS,
          payload : data.allChats
      })
    } catch (error) {
        dispatch({
         type : ALL_CHATS_OF_USER_FAIL,
         payload:error.response.message.data
        })
    }
 }