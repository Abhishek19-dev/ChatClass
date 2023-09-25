import axios from 'axios'
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actionType'

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
    } catch (error) {
        dispatch({
         type : LOGIN_FAIL,
         payload:error.response.message.data
        })
    }
 }