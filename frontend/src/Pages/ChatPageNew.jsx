 import React, { useEffect, useState } from 'react'; 
import SideBar from '../components/MychatsNew/SideBarNew';
import { Box } from '@chakra-ui/react';
import SideBarNew from '../components/MychatsNew/SideBarNew';
import MyProfileTabs from '../components/MychatsNew/SideBarTabs/MyProfileTabs';
import ChatBoxNew from '../components/MychatsNew/ChatBoxNew';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChat } from '../redux/actions/chatAction';
 
 const ChatPageNew = () =>{
    const [selectedChat, setSelectedChat] = useState('')
    const {user} = useSelector((state)=> state.loginUser)

return (
    <>
    <Box display='flex'>
    <SideBarNew selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
    <ChatBoxNew setSelectedChat = {setSelectedChat} selectedChat = {selectedChat} user={user} />
    </Box>
    
    </>
)
}
export default ChatPageNew