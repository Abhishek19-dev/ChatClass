import { Box } from '@chakra-ui/react'
import React from 'react'
import MyChatsTabs from './SideBarTabs/MyChatsTabs'

const SecondChatBarSection = ({ children, selectedChat }) => {
  return (
    // <Box ml={2} bgColor='#F4F7FB'  display='flex'  w='70vh' h='100vh' flexDir='column'>
    // <Box bg='red' ml={2}   display='flex'  maxW='70vh' h='100vh' flexDir='column'>
    // <Box maxW='24rem'>
    <Box
    display={{lg:'block', base: selectedChat ? 'none' : 'block'}}
      zIndex={{ lg: 10, base: 1 }}
      order={{ base: 0, lg: 0 }}
      w={{ lg: '400px', base: '100%' }}
      h={{ lg: `calc(100% + 20px)`, base: `calc(100% - 80px)` }}
    >
      {children}
    </Box>
  )
}

export default SecondChatBarSection
