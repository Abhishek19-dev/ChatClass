 import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import NavBar from '../components/HomePageUtils/Navbar';
import FirstSection from '../components/HomePageUtils/FirstSection';
import { getAllChat } from '../redux/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import GroupSection from '../components/HomePageUtils/GroupSection';
import WhyChatClass from '../components/HomePageUtils/WhyChatClass';
import Footer from '../components/HomePageUtils/Footer';
import ContactUs from '../components/HomePageUtils/ContacUs';
import { loginUser } from '../redux/actions/userAction';


 
 const HomePage = (selectedChat, setSelectedChat, myTabs, setMyTabs , user) =>{
   
  const dispatch = useDispatch()
  const handleGetAllChats = ()=>{
      dispatch(getAllChat())
  }

  
return (
    <>
    <Box  w={{base:'100%',md:"100%"}}>
    <NavBar  myTabs = {myTabs} setMyTabs={setMyTabs} selectedChat={selectedChat} setSelectedChat={setSelectedChat}  />
  <FirstSection />
  <WhyChatClass />
  <ContactUs  />
  <Footer />
    </Box>
    </>
)
};
 
export default HomePage