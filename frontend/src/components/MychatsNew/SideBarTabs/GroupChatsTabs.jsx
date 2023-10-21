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
 
 const GroupChatsTabs = () =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
return (
    <>
    <Box bgColor='#F4F7FB'  display='flex'  w='50vh' h='99vh' flexDir='column'>
        <Box display='flex' justifyContent='space-between'>
        <Text fontFamily='Public Sans' textColor='#3f414D' ml={5}  fontWeight={600} fontSize='23px'  mt={9}>Groups</Text>
        <Button onClick={onOpen} w='' mr={3} mt={9} leftIcon={<UilPlus />} colorScheme="blue" variant="outline">
            Create Group Chats
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily='Public Sans' fontWeight={600}>Create New Group</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody mb={4}>
            <Box display='flex' flexDirection='column'>
            <Text mt={2} mb={3} fontFamily='Public Sans' fontWeight={600}>Group Name</Text>
          <Input focusBorderColor='#7168EF' opacity={0.7} placeholder='Enter Group Name' size='md' />

          <Text fontFamily='Public Sans' fontWeight={500} mt={7}>Group Members</Text>
          <Input mt={4} focusBorderColor='#7168EF' opacity={0.7} placeholder='Add Members' size='md' />
          <Box mt={5} maxH='20vh' overflowY='auto'>

             <Wrap spacing={4}>
             <WrapItem bg='#E6EBF5' borderRadius='md' p={2} alignItems='center'>
             <Avatar  size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
             <AvatarBadge boxSize='0.8em' bg='#2BB47D' />
             </Avatar>{' '}
              <Text ml={2}>Abhhishek Padiyar</Text>
             </WrapItem>
             <WrapItem bg='#E6EBF5' borderRadius='md' p={2} alignItems='center'>
             <Avatar  size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
             <AvatarBadge boxSize='0.8em' bg='#2BB47D' />
             </Avatar>{' '}
              <Text ml={2}>Abhhishek Padiyar</Text>
             </WrapItem>
             </Wrap>
          </Box>
          <Text fontFamily='Public Sans' fontWeight={500} mt={7}>Group Description</Text>
            <Textarea mt={3} focusBorderColor='#7168EF'></Textarea>
            </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button fontFamily='Public Sans'  mr={3} onClick={onClose}>
              Close
            </Button>
            <Button _hover={{bg:'#675ED7'}} bg='#675ED9' textColor='white'>Create Groups</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Box>
        <InputGroup  borderRadius='sm' p={2} bgColor='#E6EBF5' ml={5} mt={8} mb={5} width='22rem'>
    <InputLeftElement pointerEvents='none'>
      <Icon mt={3} w={6} h={6} color='#8C8C8C'><UilSearch  /></Icon>
    </InputLeftElement>
    <Input  _hover={{ borderColor: 'transparent', boxShadow: 'none' }} focusBorderColor='transparent' focusShadow='none' type='tel' fontFamily='Public Sans' color='black' fontWeight={500} placeholder='Search messages or user' />
  </InputGroup>

  <Stack mt={5} maxH='54vh'  overflowY='auto'>
       <Box pl={0}  p={4} _hover={{bg:'#E6EBF5'}} display='flex' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
        <Avatar  size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
        </Avatar>{' '}
              <Text textColor='black' fontFamily='Public Sans' fontWeight={600} ml={5}>#Group 1</Text>
        </Box>
       </Box>
       <Box pl={0}  p={4} _hover={{bg:'#E6EBF5'}} display='flex' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
        <Avatar  size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
        </Avatar>{' '}
              <Text textColor='black' fontFamily='Public Sans' fontWeight={600} ml={5}>#Group 1</Text>
        </Box>
       </Box>
       <Box pl={0}  p={4} _hover={{bg:'#E6EBF5'}} display='flex' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
        <Avatar  size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
        </Avatar>{' '}
              <Text textColor='black' fontFamily='Public Sans' fontWeight={600} ml={5}>#Group 1</Text>
        </Box>
       </Box>
       <Box pl={0}  p={4} _hover={{bg:'#E6EBF5'}} display='flex' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
        <Avatar  size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds'>
        </Avatar>{' '}
              <Text textColor='black' fontFamily='Public Sans' fontWeight={600} ml={5}>#Group 1</Text>
        </Box>
       </Box>
       </Stack>
    </Box>
    </>
)
};
 
export default GroupChatsTabs