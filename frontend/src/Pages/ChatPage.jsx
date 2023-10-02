import React, { useEffect, useState } from 'react'; 
import {useDispatch, useSelector} from 'react-redux'
import { Container, Box, Text } from '@chakra-ui/react'
import SideDrawer from '../components/Authentication/chatSection/SideDrawer';
import MyChat from '../components/Authentication/chatSection/MyChat';
import ChatBox from '../components/Authentication/chatSection/ChatBox'
import { Link, useNavigate } from "react-router-dom";
import { getAllChat } from '../redux/actions/chatAction';

 const ChatPage = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedChat , setSelectedChat] = useState(false)


   //get all chats of a user
    useEffect(()=>{
        dispatch(getAllChat())
    },[dispatch,getAllChat])


    const {user , isLoggedIn} = useSelector((state)=> state.loginUser)
    const {isLoggedOut} = useSelector((state)=> state.logoutUser)
    const {users} = useSelector((state)=>state.accessChat)
    const {allChats} = useSelector((state)=> state.allChats)

    useEffect(()=>{
        if(users.length > 0){
            setSelectedChat(true)
        }
    },[users.length])
    
    

    useEffect(()=>{
        if(isLoggedOut){
            navigate("/login")
        }
    },[navigate,isLoggedOut])
return (
    <>
   <div style = {{width : "100%"}}>
       {user &&  <SideDrawer />}
        <Box 
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
        >
        {user && <MyChat allChats = {allChats} users={users} user = {user} selectedChat = {selectedChat} setSelectedChat = {setSelectedChat} />}
        {user && <ChatBox />}
        </Box>

   </div>
    </>
)
};
 
export default ChatPage