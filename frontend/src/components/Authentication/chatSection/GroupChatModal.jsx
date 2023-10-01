 import { Button, FormControl, Input, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'; 
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { searchUser } from '../../../redux/actions/chatAction';
 const GroupChatModal = ({children}) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [chatName , setChatName] = useState("")
    const [users , setusers] = useState([])
    const [search , setSearch] = useState("")
    const dispatch = useDispatch()

    const handleSearch = (search)=>{
    //    setSearch(query)
       console.log("search",search)
        // if(!query){
        //     return
        // }
       dispatch(searchUser(search))
    }

    const handleSubmit = ()=>{

    }
    
    const toast = useToast()
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
    <ModalCloseButton />
    <ModalBody display='flex' flexDir='column' alignItems='center'>
        <FormControl>
            <Input value={chatName} onChange={(e)=> setChatName(e.target.value)} placeholder='Chat Name' mb={3}/>
            <Input placeholder='Add Users eg : Abhishek , Aryan , Parth' value={search} onChange={handleSearch(search)} mb={2}/>
        </FormControl>
        {/* selected users list */}
      {/* render searched users below it */}
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