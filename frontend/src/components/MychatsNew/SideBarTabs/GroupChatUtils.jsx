import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Slide,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import { UilPen } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { addUserToGroup, deleteUserGroup } from '../../../redux/actions/chatAction'
import { ADD_USER_TO_GROUP_RESET } from '../../../redux/actionType'

//group chat dialog box search bar ki profile
export const GroupChatSearchProfile = ({ user, handleFunction }) => {
  return (
    <>
      <WrapItem
        onClick={handleFunction}
        bg="#E6EBF5"
        borderRadius="md"
        p={2}
        alignItems="center"
      >
        <Avatar
          size="sm"
          name={user && user.name}
          src={user && user.avatar.url}
        >
        </Avatar>{' '}
        <Text ml={2}>{user && user.name}</Text>
      </WrapItem>
    </>
  )
}

//this is for selecteduserarray
export const GroupChatSelectedUser = ({ user, handleFunction }) => {
  return (
    <>
      <Box
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        backgroundColor="purple"
        color="white"
        cursor="pointer"
        onClick={handleFunction}
      >
        {user.name}
        <CloseIcon pl={1} />
      </Box>
    </>
  )
}

export const GroupChatNameUtils = ({
  chat,
  key,
  user,
  isActive,
  selectedChat,
  setSelectedChat,
}) => {
  return (
    <>
      <Box
        onClick={() => setSelectedChat(chat)}
        pl={0}
        p={4}
        _hover={{ bg: '#E6EBF5' }}
        display="flex"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" w="100%">
          <Avatar size="md" name={chat && chat.chatName}></Avatar>{' '}
          <Box
            display="flex"
            ml="2vh"
            flexDirection="column"
            maxWidth={{ lg: '23vw', base: '34vw' }}
          >
            <Text
              fontFamily="Public Sans"
              fontSize="1rem"
              fontWeight={600}
              textColor="black"
              maxWidth="100%"
              whiteSpace="nowrap" // Set white-space to nowrap
              overflow="hidden" // Hide overflow
              textOverflow="ellipsis"
            >
              {chat && chat.chatName}
            </Text>
            <Text
              fontFamily="Public Sans"
              fontSize="0.8rem"
              fontWeight={300}
              textColor="A9A9A9"
              maxWidth="100%"
              whiteSpace="nowrap" // Set white-space to nowrap
              overflow="hidden" // Hide overflow
              textOverflow="ellipsis"
            >
              {chat.latestMessage
                ? `${chat.latestMessage.sender.name.split(' ')[0]} : ${
                    chat.latestMessage.content
                  }`
                : 'No messages yet'}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export const GroupDescriptionModalUtils = ({u , user, selectedChat , setSelectedChat}) => {
    const dispatch = useDispatch()
    const handleRemoveUserGroup = ()=>{
        const newSelectedChatUsers = selectedChat.users && selectedChat.users.filter((uss)=>{
            return(
                uss._id !== u._id
            )
        })
        const newSelectedChat = { ...selectedChat, users: newSelectedChatUsers };
        setSelectedChat(newSelectedChat)
        dispatch(deleteUserGroup(selectedChat,u))
        console.log("new selected chat users",selectedChat)
    }
  return (
    <>
      <Box
        bg="#E6EBF5"
        borderRadius="lg"
        display="flex"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        h="fit-content"
        p="0.5vw"
      >
        <Box w="70%" display="flex" alignItems="center">
          <Avatar
            ml="0.2vw"
            size="md"
            name={u.name}
            src= {u.avatar.url && u.avatar.url}
          />
          <Text
            maxW="50%"
            ml="1vw"
            fontFamily="Public Sans"
            fontWeight={500}
            whiteSpace="nowrap" // Set white-space to nowrap
            overflow="hidden" // Hide overflow
            textOverflow="ellipsis"
          >
           {user._id === u._id ? "You" : u.name}
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Text fontFamily="Public Sans" fontWeight={500}>
            {/* Admin */}
            {u._id == selectedChat.groupAdmin._id ? "Admin" : "" }
          </Text>
          <Menu>
            <MenuButton  mb="0.5vw" variant="none" as={Button}>
              ...
            </MenuButton>
            <MenuList position="absolute" bottom="50%" right="80%">
              <MenuItem>Info</MenuItem>
              <Divider></Divider>
              {
                user._id == selectedChat.groupAdmin._id && <MenuItem onClick={handleRemoveUserGroup}>Remove from Group</MenuItem>
              }
              
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Divider></Divider>
    </>
  )
}

export const GroupChatAddSearchedUsers = ({u,selectedChat , setSelectedChat}) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const alreadyPresent = selectedChat.users.find((us)=> u._id === us._id)
    const handleAddUsersToGroupButton = ()=>{
       dispatch(addUserToGroup(selectedChat , u))
    }
    // console.log("already pressetn",alreadyPresent)
    const {loading : addUserLoading , isAdded , newMember} = useSelector((state)=> state.addUserGroup)
    console.log("user added : ",isAdded)
    console.log("new Member : ",newMember)
    useEffect(()=>{
        if(isAdded){
            setSelectedChat(newMember)
            toast({
                title: `User added to Group Successfully`,
                status: 'success',
                position:'top',
                isClosable: true,
              })
            //   dispatch({
            //     type:ADD_USER_TO_GROUP_RESET
            //   })
        }
    },[isAdded])
    
  return (
    <>̀
      <Box
        display="flex"
        bg="white"
        borderRadius="md"
        p="0.5vw"
        flexDirection="row"
        justifyContent="space-between"
        alignItems='center'
      >
        <Box  display="flex" flexDirection="row" alignItems='center'>
          <Avatar name={u && u.name} src= {u.avatar.url && u.avatar.url}/>
          <Text ml='0.5vw' fontFamily="Public Sans" fontWeight={500} fontSize="2.2vh">
           {u && u.name}
          </Text>
        </Box>
        {
           alreadyPresent ? <Text fontFamily='Public Sans' fontWeight={400} color='grey' fontSize='0.8vw'>Already Present</Text> :  <IconButton onClick={handleAddUsersToGroupButton} variant="none">
           <UilPlus />
         </IconButton>
        }
      </Box>
    </>
  )
}
