 import { Avatar, AvatarBadge, Box, Button, Divider, Icon, Input, InputGroup, InputLeftElement, Stack, Text, Textarea, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react';
import React from 'react'; 
import { UilPlus } from '@iconscout/react-unicons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { UilSearch } from '@iconscout/react-unicons'
import GroupChatModal from '../../Authentication/chatSection/GroupChatModal';
import GroupChatModalNew from './GroupChatModalNew';
import { GroupChatNameUtils } from './GroupChatUtils';
import { useSelector } from 'react-redux';
 
 const GroupChatsTabs = ({user, isActive, selectedChat, setSelectedChat }) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { allChats } = useSelector((state) => state.allChats)

return (
    <>
    <Box bgColor='#F4F7FB'  display='flex'  w='50vh' h='99vh' flexDir='column'>
        <Box display='flex' justifyContent='space-between'>
        <Text fontFamily='Public Sans' textColor='#3f414D' ml={5}  fontWeight={600} fontSize='23px'  mt={9}>Groups</Text>
        {/* this is my modal for create group chat */}
         <GroupChatModalNew />

        </Box>
        <InputGroup  borderRadius='sm' p={2} bgColor='#E6EBF5' ml={5} mt={8} mb={5} width='22rem'>
    <InputLeftElement pointerEvents='none'>
      <Icon mt={3} w={6} h={6} color='#8C8C8C'><UilSearch  /></Icon>
    </InputLeftElement>
    <Input  _hover={{ borderColor: 'transparent', boxShadow: 'none' }} focusBorderColor='transparent' focusShadow='none' type='tel' fontFamily='Public Sans' color='black' fontWeight={500} placeholder='Search messages or user' />
  </InputGroup>

  <Stack mt={5} maxH='54vh'  overflowY='auto'>
      {allChats
              ? allChats
                  .filter((c) => c.isGroupChat)
                  .map((chat) => (
                    <GroupChatNameUtils 
                      selectedChat={selectedChat}
                      setSelectedChat={setSelectedChat}
                      user={user}
                      isActive={isActive}
                      chat={chat}
                      key={chat._id}
                    />
                  ))
              : 'No Chats to Show'}
       </Stack>
    </Box>
    </>
)
};
 
export default GroupChatsTabs