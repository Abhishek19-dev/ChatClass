 import { Avatar, AvatarBadge, Box, Text, WrapItem } from '@chakra-ui/react';
import React from 'react'; 
import { CloseIcon } from '@chakra-ui/icons';
 
//group chat dialog box search bar ki profile
 export const GroupChatSearchProfile = ({user,handleFunction}) =>{
return (
    <>
     <WrapItem  onClick={handleFunction} bg='#E6EBF5' borderRadius='md' p={2} alignItems='center'>
             <Avatar  size='sm' name={user && user.name} src={user && user.avatar.url}>
             <AvatarBadge boxSize='0.8em' bg='#2BB47D' />
             </Avatar>{' '}
              <Text ml={2}>{user && user.name}</Text>
             </WrapItem>
    </>
)
};
 

//this is for selecteduserarray
export const GroupChatSelectedUser = ({user,handleFunction}) =>{
    return (
        <>
           <Box
   px={2}
   py={1}
   borderRadius='lg'
   m={1}
   mb={2}
   variant = 'solid'
   fontSize={12}
   backgroundColor='purple'
   color='white'
   cursor='pointer'
   onClick={handleFunction}
   >
   {user.name}
   <CloseIcon pl={1}/>
   </Box>
        </>
    )
    };
     
    export const GroupChatNameUtils = ({chat, key, user, isActive , selectedChat , setSelectedChat }) =>{
      console.log("selected group chat",selectedChat)
        return (
            <>
            <Box  onClick={() => setSelectedChat(chat)} pl={0}  p={4} _hover={{bg:'#E6EBF5'}} display='flex' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
        <Avatar  size='md' name={chat && chat.chatName}>
        </Avatar>{' '}
              <Text textColor='black' fontFamily='Public Sans' fontWeight={600} ml={5}>{chat && chat.chatName}</Text>
        </Box>
       </Box>
            </>
        )
        };
         