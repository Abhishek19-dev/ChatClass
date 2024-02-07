import axios from 'axios'
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, EDIT_DESCRIPTION_FAIL, EDIT_DESCRIPTION_REQUEST, EDIT_DESCRIPTION_SUCCESS, EDIT_USER_PROFILE_FAIL, EDIT_USER_PROFILE_REQUEST, EDIT_USER_PROFILE_SUCCESS, GET_ALL_PUBLIC_CHAT_USER_FAIL, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_RESET, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_LOGIN, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actionType'

export const registerUser = (formData) =>async(dispatch)=>{
   try {
    dispatch({
        type: REGISTER_REQUEST
     })
     const config = {headers:{"Content-type":"multipart/form-data"}}
     const {data} = await axios.post("/api/v1/user/register",formData,config)

     dispatch({
         type : REGISTER_SUCCESS,
         payload : data.user
     })
   } catch (error) {
       dispatch({
        type : REGISTER_FAIL,
        payload:error.response.message.data
       })
   }
}

export const loginUser = (email,password) =>async(dispatch)=>{
    try {
     dispatch({
         type: LOGIN_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.post("/api/v1/user/login",{email,password},config)
      dispatch({
          type : LOGIN_SUCCESS,
          payload : data.user
      })
      dispatch({
        type : REGISTER_LOGIN
      })
      dispatch(getUserDetails())
    //   dispatch({
    //     type : LOGOUT_RESET
    // })
    } catch (error) {
        dispatch({
         type : LOGIN_FAIL,
         payload:error.response.message.data
        })
    }
 }

 export const logoutUser = () =>async(dispatch)=>{
    try {
     dispatch({
         type: LOGOUT_REQUEST
      })
      
      const {data} = await axios.get("/api/v1/user/logout")
      dispatch({
          type : LOGOUT_SUCCESS,
          payload : data.message
      })
      dispatch({
        type:LOGIN_RESET
      })
    } catch (error) {
        dispatch({
         type : LOGOUT_FAIL,
         payload:error.response.message.data
        })
    }
 }



 //Get all users
 export const allUsers = () =>async(dispatch)=>{
    try {
     dispatch({
         type: ALL_USERS_REQUEST
      })
      const {data} = await axios.get("api/v1/allUsers")
 
      dispatch({
          type : ALL_USERS_SUCCESS,
          payload : data.users
      })
    } catch (error) {
        dispatch({
         type : ALL_USERS_FAIL,
         payload:error.response.message.data
        })
    }
 }



 //Edit Description
 export const editDescription = (des) =>async(dispatch)=>{
    try {
     dispatch({
         type: EDIT_DESCRIPTION_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.put("/api/v1/editDescription",{description:des},config)
 
      dispatch({
          type : EDIT_DESCRIPTION_SUCCESS,
          payload : data
      })
      dispatch(getUserDetails())
    } catch (error) {
        dispatch({
         type : EDIT_DESCRIPTION_FAIL,
         payload:error.response.message.data
        })
    }
 }
 

 //Get User Details
 export const getUserDetails = () =>async(dispatch)=>{
    try {
     dispatch({
         type: GET_USER_DETAILS_REQUEST
      })
      
      const {data} = await axios.get("/api/v1/getUserDetails")
      dispatch({
          type : GET_USER_DETAILS_SUCCESS,
          payload : data
      })
     
    } catch (error) {
        dispatch({
         type : GET_ALL_PUBLIC_CHAT_USER_FAIL,
         payload:error.response.message.data
        })
    }
 }

 //Edit User Email and Location
 export const editUserProfile = (userEmail , userLocation) =>async(dispatch)=>{
    try {
     dispatch({
         type: EDIT_USER_PROFILE_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.put("/api/v1/editProfile",{email:userEmail , Location : userLocation},config)
 
      dispatch({
          type : EDIT_USER_PROFILE_SUCCESS,
          payload : data
      })
      dispatch(getUserDetails())
    } catch (error) {
        dispatch({
         type : EDIT_USER_PROFILE_FAIL,
         payload:error.response.message.data
        })
    }
 }