 import { Box } from '@chakra-ui/react';
import React from 'react'; 
import MyChatsTabs from './SideBarTabs/MyChatsTabs';
 
 const SecondChatBarSection = ({children}) =>{
return (
    // <Box ml={2} bgColor='#F4F7FB'  display='flex'  w='70vh' h='100vh' flexDir='column'>
    // <Box bg='red' ml={2}   display='flex'  maxW='70vh' h='100vh' flexDir='column'>
    // <Box maxW='24rem'>
    <Box bg='green' w='400px'>
        {children}
    </Box>
)
};
 
export default SecondChatBarSection