 import React from 'react'; 
import SideBar from '../components/MychatsNew/SideBarNew';
import { Box } from '@chakra-ui/react';
import SideBarNew from '../components/MychatsNew/SideBarNew';
import MyProfileTabs from '../components/MychatsNew/SideBarTabs/MyProfileTabs';
import ChatBoxNew from '../components/MychatsNew/ChatBoxNew';
 
 const ChatPageNew = () =>{
return (
    <>
    <Box display='flex'>
    <SideBarNew />
    {/* <MyProfileTabs /> */}
    <ChatBoxNew />
    </Box>
    
    </>
)
}
export default ChatPageNew