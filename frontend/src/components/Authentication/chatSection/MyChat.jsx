 import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';
import ChatLoading from '../../Features/ChatLoading';
import { getSender } from '../../ config/ChatLogics';
import GroupChatModal from './GroupChatModal';

 const MyChat = ({users,selectedChat , allChats , setSelectedChat , user:loggedUser}) =>{

    const toast = useToast()
    // console.log("allchats",allChats)
    
    // console.log("selected Chat",selectedChat)
return (
    <>
     <Box display={{base : selectedChat ? "none" : "flex",md:'flex'}} 
     flexDir='column'
     alignItems='center'
     p={3}
     bg='white'
     w = {{base : "100%" , md:"31%"}}
     borderRadius='lg'
     borderWidth='1px'
     >
        <Box pb={3}
        px={3}
        fontSize={{base : "28px",md:"30px"}}
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
        fontFamily='Work sans'
        >
         My Chats
         <GroupChatModal>
         <Button display='flex' 
        fontSize={{base : "17px", md:"10px" ,lg:"17px"}}
        rightIcon={<AddIcon />}
        >
            New Group Chat
        </Button>
         </GroupChatModal>
        </Box>

        <Box display='flex' flexDir='column' p={3} bg='#F8F8F8' w='100%' h='100%' borderRadius='lg' overflowY='hidden'>
         {allChats && allChats.length > 0 ? (
             <Stack>
                 {
                    allChats.map((chat)=>(
                        <Box 
                        onClick={()=> setSelectedChat(chat)}
                        cursor='pointer'
                        bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                        color={selectedChat === chat ? "white" : "black"}
                        px={3}
                        py={4}
                        borderRadius='lg'
                        key={chat._id}
                        >
                            <Text>
                                {!chat.isGroupChat?(getSender(loggedUser , chat.users)):(chat.chatName)}
                            </Text>
                        </Box>
                    ))
                 }
             </Stack>
         ):(
            <ChatLoading />
         )}
        </Box>
     </Box>
    </>
)
};
 
export default MyChat