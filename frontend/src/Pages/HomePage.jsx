 import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react'; 
import { Link } from 'react-router-dom';
import NavBar from '../components/HomePageUtils/Navbar';
import FirstSection from '../components/HomePageUtils/FirstSection';
import { getAllChat } from '../redux/actions/chatAction';
import { useDispatch } from 'react-redux';
import GroupSection from '../components/HomePageUtils/GroupSection';
import WhyChatClass from '../components/HomePageUtils/WhyChatClass';

 
 const HomePage = () =>{
   
  const dispatch = useDispatch()
  const handleGetAllChats = ()=>{
      dispatch(getAllChat())
  }
// return <div><Link to = "/chats"><Button onClick={handleGetAllChats}>Chats</Button></Link></div>
return (
    <>
    <Box  w={{base:'100%',md:"100%"}}>
    <NavBar />
  <FirstSection />
  {/* <GroupSection /> */}
  {/* <WhyChatClass /> */}
    </Box>
    </>
)
};
 
export default HomePage