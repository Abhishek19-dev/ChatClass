 import { Avatar, AvatarBadge, Box, Icon, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'; 
import { HiPhoneIncoming } from 'react-icons/hi';
import { UilSearch } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux';
import { getAllChat } from '../../../redux/actions/chatAction';
import { RecentChats, returnSender } from './RecentChatsUtils';


 
 const MyChatsTabs = ({user , isActive , selectedChat , setSelectedChat}) =>{
      const dispatch = useDispatch()
      useEffect(()=>{
         dispatch(getAllChat())
      },[user._id])

      const {allChats} = useSelector((state)=> state.allChats)
      

return (
    <>

    <Box  bgColor='#F4F7FB'  display='flex'  w='50vh' h='fit-content' flexDir='column'>
        <Text fontFamily='Public Sans' textColor='#3f414D' ml={5}  fontWeight={600} fontSize='23px'  mt={9}>Chats</Text>

        <InputGroup  borderRadius='sm' p={2} bgColor='#E6EBF5' ml={5} mt={8} mb={5} width='22rem'>
    <InputLeftElement pointerEvents='none'>
      <Icon mt={3} w={6} h={6} color='#8C8C8C'><UilSearch  /></Icon>
    </InputLeftElement>
    <Input  _hover={{ borderColor: 'transparent', boxShadow: 'none' }} focusBorderColor='transparent' focusShadow='none' type='tel' fontFamily='Public Sans' color='black' fontWeight={500} placeholder='Search messages or user' />
  </InputGroup>

    <Stack mb={8} mt={10} ml={4} direction='row' spacing={5}>

       <Box position='relative' w='5rem' h='4rem' borderRadius='md' bgColor='#E6EBF5'>
       <Avatar position='absolute' left='18px' top='-23px' size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
       <AvatarBadge boxSize='0.8em' bg='#2BB47D' />
        </Avatar>{' '}
         <Text pt={8} pl={3} fontFamily='Public Sans' fontSize='13px' fontWeight={700}  >Abhishek</Text>
       </Box>


       <Box position='relative' w='5rem' h='4rem' borderRadius='md' bgColor='#E6EBF5'>
       <Avatar position='absolute' left='18px' top='-23px' size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
       <AvatarBadge boxSize='0.8em' bg='#2BB47D' />
        </Avatar>{' '}
         <Text pt={8} pl={3} fontFamily='Public Sans' fontSize='13px' fontWeight={700}  >Abhishek</Text>
       </Box>


       <Box position='relative' w='5rem' h='4rem' borderRadius='md' bgColor='#E6EBF5'>
       <Avatar position='absolute' left='18px' top='-23px' size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
       <AvatarBadge boxSize='0.8em' bg='#2BB47D' />
        </Avatar>{' '}
         <Text pt={8} pl={3} fontFamily='Public Sans' fontSize='13px' fontWeight={700}  >Abhishek</Text>
       </Box>


       <Box position='relative' w='5rem' h='4rem' borderRadius='md' bgColor='#E6EBF5'>
       <Avatar position='absolute' left='18px' top='-23px' size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
       <AvatarBadge boxSize='0.8em' bg='#2BB47D' />
        </Avatar>{' '}
         <Text pt={8} pl={3} fontFamily='Public Sans' fontSize='13px' fontWeight={700}  >Abhishek</Text>
       </Box>

    </Stack>

     <Box>
     <Text fontFamily='Public Sans' textColor='black' ml={5}  fontWeight={600} fontSize='18px'>Recent</Text>

     <Stack mt={5} bg='#F4F7FB' h='53vh'  overflowY='auto'>
       
       {allChats ? allChats.filter((c)=> !c.isGroupChat).map((chat)=> (
            <RecentChats selectedChat = {selectedChat} setSelectedChat = {setSelectedChat}  user = {user} isActive={isActive} chat = {chat}  key = {chat._id} />
       )) : "No Chats to Show"}

     </Stack>

     </Box>
      
    </Box>
    </>
)
};
 
export default MyChatsTabs