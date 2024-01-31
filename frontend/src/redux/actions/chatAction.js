import { ACCESS_CHAT_FAIL, ACCESS_CHAT_REQUEST, ACCESS_CHAT_SUCCESS, ADD_USER_TO_GROUP_FAIL, ADD_USER_TO_GROUP_REQUEST, ADD_USER_TO_GROUP_SUCCESS, ALL_CHATS_OF_USER_FAIL, ALL_CHATS_OF_USER_REQUEST, ALL_CHATS_OF_USER_SUCCESS, CREATE_A_GROUP_CHAT_FAIL, CREATE_A_GROUP_CHAT_REQUEST, CREATE_A_GROUP_CHAT_SUCCESS, DELETE_FROM_GROUP_FAIL, DELETE_FROM_GROUP_REQUEST, DELETE_FROM_GROUP_SUCCESS, JOIN_A_GROUP_FAIL, JOIN_A_GROUP_REQUEST, JOIN_A_GROUP_SUCCESS, RENAME_CHAT_FAIL, RENAME_CHAT_REQUEST, RENAME_CHAT_SUCCESS, SEARCH_A_GROUP_FAIL, SEARCH_A_GROUP_REQUEST, SEARCH_A_GROUP_RESET, SEARCH_A_GROUP_SUCCESS, SEARCH_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS } from "../actionType"
import axios from 'axios'
import { allMessagesAction } from "./messageAction"

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

 //get all chat of a user
 export const getAllChat = (selectedChat,setSelectedChat) =>async(dispatch)=>{
   
    try {
     dispatch({
         type: ALL_CHATS_OF_USER_REQUEST
      })
      
      const {data} = await axios.get("/api/v1/allChats")

      dispatch({
          type : ALL_CHATS_OF_USER_SUCCESS,
          payload : data.allChats
      })
    //   await setSelectedChat(data.allChats[0])
    } catch (error) {
        dispatch({
         type : ALL_CHATS_OF_USER_FAIL,
        //  payload:error.response.message.data
         payload:error.response      
        })
    }
 }


 export const createAGroupChat = (selectedUserArray,chatName,groupDescription , isPublicGroupChat) =>async(dispatch)=>{
    console.log("isPublicGroupChat",isPublicGroupChat)
    try {
     dispatch({
         type: CREATE_A_GROUP_CHAT_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.post("/api/v1/groupChats",{users:JSON.stringify(selectedUserArray.map((u)=> u._id)) , chatName,groupDescription , isPublicGroupChat},config)
      dispatch({
          type : CREATE_A_GROUP_CHAT_SUCCESS,
          payload : data
      })
      dispatch(getAllChat())
    } catch (error) {
        dispatch({
         type : CREATE_A_GROUP_CHAT_FAIL,
         payload:error.response.message.data
        })
    }
 }


 //RENAME A CHAT:-
 export const renameChat = (selectedChat , newChatName) =>async(dispatch)=>{

    try {
     dispatch({
         type: RENAME_CHAT_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.put("/api/v1/renameGroup",{chatId : selectedChat._id , newChatName},config)
      dispatch({
          type : RENAME_CHAT_SUCCESS,
          payload : data.updatedGroupChat
      })
      dispatch(getAllChat())
    } catch (error) {
        dispatch({
         type : RENAME_CHAT_FAIL,
         payload:error.response.message.data
        })
    }
 }

 //ADD A USER:-
 export const addUserToGroup = (selectedChat , u) =>async(dispatch)=>{
   try {
    dispatch({
        type: ADD_USER_TO_GROUP_REQUEST
     })
     const config = {headers:{"Content-type":"application/json"}}
     const {data} = await axios.put("/api/v1/addToGroup",{chatId : selectedChat._id , userId:u._id},config)
     dispatch({
         type : ADD_USER_TO_GROUP_SUCCESS,
         payload : data
     })
    //  dispatch(getAllChat())
   } catch (error) {
       dispatch({
        type : ADD_USER_TO_GROUP_FAIL,
        payload:error.response.message.data
       })
   }
}

export const deleteUserGroup = (selectedChat , u) =>async(dispatch)=>{

    try {
     dispatch({
         type: DELETE_FROM_GROUP_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.put("/api/v1/removeFromGroup",{chatId : selectedChat._id , userId:u._id},config)
      dispatch({
          type : DELETE_FROM_GROUP_SUCCESS,
          payload : data.removedMember
      })
    } catch (error) {

        dispatch({
         type : DELETE_FROM_GROUP_FAIL,
        //  payload:error.response.message.data
        })
    }
 }

 export const searchGroup = (groupInviteId) => async(dispatch)=>{
    // console.log("Group Invite Id inside action",groupInviteId)
    try {
        dispatch({
            type : SEARCH_A_GROUP_REQUEST
        })
        const config = {headers:{"Content-type":"application/json"}}
        const {data} = await axios.post("/api/v1/searchGroup",{groupInviteId : groupInviteId},config)
        // console.log("search data",data)
        dispatch({
            type : SEARCH_A_GROUP_SUCCESS,
            payload : data.chat
        })
    } catch (error) {
        dispatch({
            type : SEARCH_A_GROUP_FAIL,
            payload:error.response.message.data
           })
    }
 }


//  export const JoinGroup = (_id) => async(dispatch)=>{
//     console.log("group joined id",_id)
//     try {
//         dispatch({
//             type : JOIN_A_GROUP_REQUEST
//         })
//         const config = {headers:{"Content-type":"application/json"}}
//         // console.log("Request payload:", { groupId : groupChatId});
//         const {data} = await axios.post("/api/v1/joinGroup",{groupId: _id},config)
//         console.log("join",data)
//         dispatch({
//             type : JOIN_A_GROUP_SUCCESS,
//             payload : data  
//         })
//         dispatch(getAllChat())
//     } catch (error) {
//         dispatch({
//             type : JOIN_A_GROUP_FAIL,
//             payload:error.response
//            })
//            console.log("error message",error.response.data)
//     }
//  }

export const joinGroup = (group , user) =>async(dispatch)=>{
    try {
     dispatch({
         type: JOIN_A_GROUP_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.put("/api/v1/joinGroup",{groupId : group._id , userId:user._id},config)
      console.log("data of join",data)
      dispatch({
          type : JOIN_A_GROUP_SUCCESS,
          payload : data
      })
        dispatch(getAllChat())
      
    } catch (error) {
        dispatch({
         type : JOIN_A_GROUP_FAIL,
         payload:error.response.message.data
        })
    }
 }