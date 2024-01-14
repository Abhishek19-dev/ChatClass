 import React, { useEffect, useState } from 'react'; 
import SideBar from '../components/MychatsNew/SideBarNew';
import { Box } from '@chakra-ui/react';
import SideBarNew from '../components/MychatsNew/SideBarNew';
import MyProfileTabs from '../components/MychatsNew/SideBarTabs/MyProfileTabs';
import ChatBoxNew from '../components/MychatsNew/ChatBoxNew';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChat } from '../redux/actions/chatAction';
import SecondChatBarSection from '../components/MychatsNew/SecondChatBarSection';
import MyChatsTabs from '../components/MychatsNew/SideBarTabs/MyChatsTabs';
 
 const ChatPageNew = ({ selectedChat, setSelectedChat, myTabs, setMyTabs  }) =>{
    // const [selectedChat, setSelectedChat] = useState('')
    const {user} = useSelector((state)=> state.loginUser)

    // const [myTabs , setMyTabs] = useState(<MyChatsTabs selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} />)

    // console.log("selected chat",selectedChat)


return (
    <>
    <Box  w='100%'  display='flex'   flexDirection={{base :'column' , lg:'row'}}>
    <SideBarNew  myTabs = {myTabs} setMyTabs={setMyTabs} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
    <SecondChatBarSection setSelectedChat = {setSelectedChat} selectedChat = {selectedChat}>{myTabs}</SecondChatBarSection>
    <ChatBoxNew  setSelectedChat = {setSelectedChat} selectedChat = {selectedChat} user={user} />
    </Box>
    
    </>
)
}
export default ChatPageNew