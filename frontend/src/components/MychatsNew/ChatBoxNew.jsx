import {
  Avatar,
  Box,
  Center,
  Divider,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilEye } from '@iconscout/react-unicons'
import { UilPaperclip } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import SingleChatNew from './SingleChatNew.jsx/SingleChatNew'
import { useDispatch, useSelector } from 'react-redux'
import { allMessagesAction, sendMessageAction } from '../../redux/actions/messageAction'
import { returnSender } from './SideBarTabs/RecentChatsUtils'
import ScrollableFeed from 'react-scrollable-feed'

import io from 'socket.io-client'

// /Declaratiion for socket.io
 const ENDPOINT = "http://localhost:8050";
 var socket , selectedChatCompare

const ChatBoxNew = ({selectedChat , user , setSelectedChat}) => {
  const dispatch = useDispatch()
  const [socketConnected , setSocketConnected] = useState(false)


   
  const {messages:receivedMessages , isReceived} = useSelector((state)=> state.allMessages)
  const [messages , setMessages] = useState([])
  const [newMessage , setNewMessage] = useState('')
  const [isEditing, setIsEditing] = useBoolean()

  //Socket.io connection
  useEffect(()=>{
     socket = io(ENDPOINT)
     socket.on("connected",()=> setSocketConnected(true))
     socket.emit('setup',user)
  },[])
  
  //to join room and all messages action dispatch
  useEffect(()=>{
     if(selectedChat && socket){
      dispatch(allMessagesAction(selectedChat))
      socket.emit("join chat",selectedChat._id)
      selectedChatCompare = selectedChat //to implement wheter to give notifications or not
     }
     else{
      return
     }
  },[selectedChat])

  useEffect(()=>{
    if(receivedMessages.length > 0){
      setMessages(receivedMessages)
    }
  },[receivedMessages])

  const sendMessage = async(event)=>{
    if(socket){
      dispatch(sendMessageAction(newMessage , selectedChat , socket , setNewMessage))
      setNewMessage('')
    }
  }

  //Send Messages:-
  const typingHandler = (e)=>{
    setNewMessage(e.target.value)
  }

  useEffect(()=>{
    socket.on("message received",(newMessageReceived)=>{

      console.log("messages before",messages)
      console.log("new message received",newMessageReceived.message)
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.message.chat._id){
      //Give notification
      }
      else{
        setMessages([...messages , newMessageReceived.message])
      }
      console.log("final messages",messages)
    })
  },[messages])

  const {isSent , message:sentMessage} = useSelector((state)=> state.sendMessage)
    useEffect(()=>{
        if(isSent)
        {
            setMessages([...messages,sentMessage])       
        }
    },[isSent])
  return (
    <>
      <Box w="121vh" display="flex" h='100vh' flexDirection="column" ml="50vh">
        <Box
          w="full"
          display="flex"
          mt="5vh"
          ml="3vh"
          mb={6}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            w="fit-content"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Avatar
              mr={3}
              size="md"
              name= { selectedChat ? returnSender(selectedChat , user).name : "Guest User"}
              src= { selectedChat  ? returnSender(selectedChat , user).avatar.url : ""}
            ></Avatar>{' '}
            <Text
              mr={3}
              fontFamily="Public Sans"
              fontSize="1rem"
              fontWeight={600}
              textColor="black"
            >
             {selectedChat && returnSender(selectedChat , user).name}
            </Text>
            <Box
              w="10px"
              h="10px"
              bg="green.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box w="2px" h="2px" bg="white" borderRadius="full" />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Popover
              isOpen={isEditing}
              onOpen={setIsEditing.on}
              onClose={setIsEditing.off}
              closeOnBlur={false}
              isLazy
              lazyBehavior="keepMounted"
            >
              <PopoverTrigger>
                <IconButton mr={6}>
                  <UilSearch />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent mr={5}>
                <PopoverBody>
                  <Input placeholder="Search your Chat" size="md" />
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <IconButton color="#74788D" bg="transparent" mr={10}>
              <UilEye />
            </IconButton>
          </Box>
        </Box>
        <Divider w="full" />

        {/* CHAT BOX  */}
        {/* <Box mt={6} ml={6} h='75vh' overflowY='auto'>  */}
        <Box  maxW='100%' maxH='75vh' overflowY='auto' mt={6} ml={6} h='75vh'> 
        <ScrollableFeed>
          <Box display="flex"  w='100%' flexDirection="column">
        {
          isReceived ? messages.map((message , index)=>{
            const sameSenderMessage =
              index >= 0 && index < messages.length - 1  &&
              messages[index].sender._id === messages[index + 1].sender._id
              return(
                <SingleChatNew sameSenderMessage = {sameSenderMessage}  user={user} message = {message} key = {message._id}/>
              )
               })  : "No messages"
        }
        </Box>
        </ScrollableFeed>
        </Box>
        <Divider pt={4}></Divider>




        <Box display='flex' alignItems='center' justifyContent='space-between'>
        <InputGroup  borderRadius='sm' p={1.5} bgColor='#E6EBF5' ml={5} mt={8} mb={5} width='48rem'>
    <Input value={newMessage} onChange={typingHandler}  _hover={{ borderColor: 'transparent', boxShadow: 'none' }} focusBorderColor='transparent' focusShadow='none' type='tel' fontFamily='Public Sans' color='black' fontWeight={500} placeholder='Enter a Messsage' />
  </InputGroup>
  <IconButton ml={-1} mt={2}><UilPaperclip /></IconButton>
  <IconButton onClick={sendMessage} mr={5} mt={2}><UilMessage /></IconButton>
        </Box>
      </Box>
    </>
  )
}

export default ChatBoxNew
