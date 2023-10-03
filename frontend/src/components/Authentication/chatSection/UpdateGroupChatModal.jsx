 import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
 import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'; 
import UserBadgeItem from '../../UserAvatar/UserBadgeItem';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToGroup, deleteUserGroup, renameChat, searchUser } from '../../../redux/actions/chatAction';
import { useSearchParams } from 'react-router-dom';
import { RENAME_CHAT_RESET } from '../../../redux/actionType';
import UserListItem from '../../UserAvatar/UserListItem';
 
 const UpdateGroupChatModal = ({selectedChat , setSelectedChat}) =>{
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newChatName , setNewChatName] = useState("")
    const [selectedUserArray , setSelectedUserArray] = useState([])
    const [search , setSearch] = useState("")
    const toast = useToast()



    const {isUpdated ,loading, updatedGroupChat} = useSelector((state)=> state.renameChat)
    const {user} = useSelector((state)=> state.loginUser)
    const {loading:searchLoading , users} = useSelector((state)=> state.searchUser)


    const handleRename = (selectedChat,newChatName)=>{
           dispatch(renameChat(selectedChat , newChatName))
    }

    //not completed
    const handleRemove = (usernew,selectedChat)=>{
          dispatch(deleteUserGroup(selectedChat,usernew))
    }

    const handleLeave = ()=>{

    }
    
    const handleSearch = (e)=>{
        setSearch(e.target.value)
        console.log("search",e.target.value)
        dispatch(searchUser(search))
      }

      const handleAddGroup = (user1)=>{
        if(selectedChat.users.find((u)=> u._id === user1._id))
        {
          toast({
            title: 'User Already In group!',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position: 'top',
          })
          return
        }
        if(selectedChat.groupAdmin._id !== user._id)
        {
            toast({
                title: 'Only Admin can add people to Group!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
              })
              return
        }
        dispatch(addUserToGroup(selectedChat , user1))
    }

  


    useEffect(()=>{
      if(isUpdated)
      {
        setSelectedChat(updatedGroupChat)
        toast({
            title: 'Group Named Changes successfully!',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'bottom',
          })
          onClose()
          dispatch({type : RENAME_CHAT_RESET})
      }

    },[isUpdated,onClose,dispatch])

   console.log("selectefdChatgdaslkgjkdasgj",selectedChat.users)
    
  
return (
    <>

    <IconButton display={{base:"flex"}} icon={<ViewIcon />}  onClick={onOpen}></IconButton>
<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader 
    fontSize='35px'
    fontFamily='Work sans'
    display='flex'
    justifyContent='center'
    >{selectedChat.chatName.toUpperCase()}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
        <Box w='100%' display='flex' flexWrap='wrap' pb={3}>
        {selectedChat.users.filter((u)=> u._id != selectedChat.groupAdmin._id).map((usernew)=>(
          <UserBadgeItem key={user._id} user={usernew} handleFunction={()=> handleRemove(selectedChat,usernew)}/>
        ))}
        </Box>

        <FormControl 
        display='flex'>
            <Input 
            placeholder='Chat Name'
            mb={3}
            value = {newChatName}
            onChange={(e)=> setNewChatName(e.target.value)}
            />
            <Button
            variant='solid'
            colorScheme='teal'
            ml={1}
            isLoading={loading}
            onClick={()=> handleRename(selectedChat , newChatName)}
            >
           Update
            </Button>
        </FormControl>
        <FormControl>
            <Input 
            placeholder = "Add User To Group"
            value={search}
            onChange = {(e)=> handleSearch(e)}
            mb={1}
            >
            </Input>
            {searchLoading ? <Spinner size='lg' /> : (
      users?.slice(0,4).map((user)=>(
        <UserListItem key={user._id} user = {user} handleFunction={()=> handleAddGroup(user)} />
      ))
     )}
        </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button onClick={()=>handleLeave(user)}  colorScheme='red'>
        Leave Group
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
)
};
 
export default UpdateGroupChatModal