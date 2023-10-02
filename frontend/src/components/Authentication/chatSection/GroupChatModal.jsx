 import { Box, Button, FormControl, Input, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'; 
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createAGroupChat, searchUser } from '../../../redux/actions/chatAction';
import { CREATE_A_GROUP_CHAT_RESET, SEARCH_USER_RESET } from '../../../redux/actionType';
import UserListItem from '../../UserAvatar/UserListItem';
import UserBadgeItem from '../../UserAvatar/UserBadgeItem';
 const GroupChatModal = ({children}) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [chatName , setChatName] = useState("")
    const [selectedUserArray , setSelectedUserArray] = useState([])
    const [selectedUserArrayId , setSelectedUserArrayId] = useState([])
    const [search , setSearch] = useState("")
    const [modalCloseButton , setModalCloseButton] = useState(false)
    const dispatch = useDispatch()
    const toast = useToast()

    const handleSearch = (e)=>{
      setSearch(e.target.value)
      console.log("search",e.target.value)
      dispatch(searchUser(search))
    }
    useEffect(()=>{
      if(modalCloseButton){
        setSearch("")
        setModalCloseButton(false)
        dispatch({type:SEARCH_USER_RESET})
      }
    },[modalCloseButton,dispatch])

    const {loading , users} = useSelector((state)=> state.searchUser)

    const handleSubmit = ()=>{
      dispatch(createAGroupChat(selectedUserArray,chatName))
    }
    const handleGroup = (userToAdd)=>{
        if(selectedUserArray.includes(userToAdd))
        {
          toast({
            title: 'User Already Added!',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position: 'top',
          })
          return
        }
        setSelectedUserArray([...selectedUserArray,userToAdd])
    }


    const handleDelete = (userToDelete)=>{
         setSelectedUserArray(selectedUserArray.filter(sel => sel._id != userToDelete._id))
    }

    const {fullGroupChat , groupChatCreated} = useSelector((state)=> state.createGroupChat)
    useEffect(()=>{
         if(groupChatCreated)
         {
          dispatch({type:CREATE_A_GROUP_CHAT_RESET})
          setModalCloseButton(false)
         }
    },[groupChatCreated,dispatch,setModalCloseButton])

    useEffect(()=>{
      if(groupChatCreated)
      {
        toast({
          title: 'Group Chat Created Successfully!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        })
      }
    },[groupChatCreated])
    
   
return (
    <>
    <span onClick={onOpen}>{children}</span>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader
    fontSize='35px'
    fontFamily='Work sans'
    display='flex'
    justifyContent='center'
    >Create Group Chat</ModalHeader>
    <ModalCloseButton  onClick={()=> setModalCloseButton(true)} />
    <ModalBody display='flex' flexDir='column' alignItems='center'>
        <FormControl>
            <Input value={chatName} onChange={(e)=> setChatName(e.target.value)} placeholder='Chat Name' mb={3}/>
            <Input placeholder='Add Users eg : Abhishek , Aryan , Parth' value={search} onChange = {(e)=> handleSearch(e)}  mb={2}/>
        </FormControl>

        {/* selected users list */}
        <Box w='100%' display='flex' flexWrap='wrap'>
        {selectedUserArray.map((user)=>(
          <UserBadgeItem key={user._id} user={user} handleFunction={()=> handleDelete(user)}/>
        ))}
       </Box>
        {/* searching user list */}

     {loading ? <div>Loading</div> : (
      users?.slice(0,4).map((user)=>(
        <UserListItem key={user._id} user = {user} handleFunction={()=> handleGroup(user)} />
      ))
     )}

      
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue'  onClick={handleSubmit}>
        Create Chat
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
)
};
 
export default GroupChatModal