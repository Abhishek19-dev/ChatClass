 import { Avatar, Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react'; 
import { messageSender } from './singleChatUtils';
import io from 'socket.io-client'
import ScrollableFeed from 'react-scrollable-feed';



 
 const SingleChatNew = ({user , message , key , sameSenderMessage}) =>{

      const [newMessage , setNewMessage] = useState("")
       
       const messageSenderIsUser = message.sender._id === user._id      

return (
    <>

             {messageSenderIsUser ?  <Box
          //  bg='blue'
          //  w='40rem'
           maxW='100%'
            display="flex"
            // bg='red'
            flexDirection="column"
          >
            <Box
              m="auto"
              mr='2.5rem'
              maxW='50vh'
              mb={1}
              borderRadius="lg"
              p={3}
              bg="#7168EF"
              // bg="red"
              h="fit-content"
              textColor="white"
              position="relative"
            >
              <Box
                zIndex="-1"
                position="absolute"
                right="0.02rem"
                bottom='-2rem'
                w={10}
                h={10}
                bg="#7168EF"
                // bg="red"
                clipPath="polygon(0 0, 100% 0, 100% 100%,  100% 30%)"
              />
              <Text mr={1} mt={3}>{message.content}</Text>
            </Box>
            {sameSenderMessage ? <Box mb={3}/> :  <Box   ml={10} display="flex" justifyContent='flex-end' pr={2.5}>
              <Text mr={3} fontFamily="Public Sans" fontWeight={400} mt={1}>
              {message.sender.name.split(" ")[0]}
              </Text>
              <Avatar
              
                size="sm"
                name= {message.sender.name}
                src= {message.sender.avatar.url}
              />
            </Box>}
          </Box>

             :

                <Box position='relative'  display="flex" flexDirection="column">
               <Box
                 m="auto"
                //  bg='black'
                 ml={10}
                 borderRadius="lg"
                 p={3}
                 bg="#7168EF"
                //  bg="red"
                 h="fit-content"
                 maxW='50vh'
                 textColor="white"
                //  position="relative"
               >
                 <Box
                   zIndex="-1"
                //    bg='red'
                   position="absolute"
                   left='2.5rem'
                   bottom="1.7rem"
                   w={8}
                   h={8}
                   bg="#7168EF"
                   clipPath="polygon(0 0, 100% 0, 100% 30%, 0 100%)"
                 />
                 <Text mt={3}>{message.content}</Text>
               </Box>
               {
                sameSenderMessage ? <Box mb={3}/> : <Box display="flex">
                <Avatar
                  size="sm"
                  name= {message.sender.name}
               src= {message.sender.avatar.url}
                />
                <Text fontFamily="Public Sans" fontWeight={400} mt={1.5} ml={3}>
                  {message.sender.name.split(" ")[0]}
                </Text>
              </Box>
               }
             </Box>
 }
    </>
)
};
 
export default SingleChatNew