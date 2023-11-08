import {
  AbsoluteCenter,
  Avatar,
  Box,
  Center,
  Divider,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  calc,
  useBoolean,
  useBreakpointValue,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilEye } from '@iconscout/react-unicons'
import { UilPaperclip } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import SingleChatNew from './SingleChatNew.jsx/SingleChatNew'
import { useDispatch, useSelector } from 'react-redux'
import {
  allMessagesAction,
  sendMessageAction,
} from '../../redux/actions/messageAction'
import { returnSender } from './SideBarTabs/RecentChatsUtils'
import ScrollableFeed from 'react-scrollable-feed'
import noMessageImg from '../../animations/noMessages.jpg'
import { UilAngleLeft } from '@iconscout/react-unicons'

import io from 'socket.io-client'

// /Declaratiion for socket.io
const ENDPOINT = 'http://localhost:8050'
var socket, selectedChatCompare

const ChatBoxNew = ({ selectedChat, user, setSelectedChat }) => {
  const [socketConnected, setSocketConnected] = useState(false)

  const dispatch = useDispatch()

  const {
    messages: receivedMessages,
    isReceived,
    loading: messageLoading,
  } = useSelector((state) => state.allMessages)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isEditing, setIsEditing] = useBoolean()

  //Socket.io connection
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.on('connected', () => setSocketConnected(true))
    socket.emit('setup', user)
  }, [])

  //to join room and all messages action dispatch
  useEffect(() => {
    if (selectedChat && socket) {
      dispatch(allMessagesAction(selectedChat))
      socket.emit('join chat', selectedChat._id)
      selectedChatCompare = selectedChat //to implement wheter to give notifications or not
    } else {
      return
    }
  }, [selectedChat])

  useEffect(() => {
    if (receivedMessages.length > 0) {
      setMessages(receivedMessages)
    } else {
      setMessages('')
    }
  }, [receivedMessages])

  const sendMessage = async (event) => {
    if (socket) {
      dispatch(
        sendMessageAction(newMessage, selectedChat, socket, setNewMessage),
      )
      setNewMessage('')
    }
  }

  //Send Messages:-
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
  }

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      console.log('messages before', messages)
      console.log('new message received', newMessageReceived.message)
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.message.chat._id
      ) {
        //Give notification
      } else {
        setMessages([...messages, newMessageReceived.message])
        // setMessages((prevMessages) => [...prevMessages, newMessageReceived.message]);
        // const newMessagesHereNow = Array.isArray(newMessageReceived.message)
        // ? newMessageReceived.message
        // : [newMessageReceived.message];

        // setMessages([...messages, ...newMessagesHereNow]);
      }
      console.log('final messages', messages)
    })
    // }, [messages])
  }, [messages])

  const {
    isSent,
    message: sentMessage,
    loading: sentMessageLoading,
  } = useSelector((state) => state.sendMessage)
  useEffect(() => {
    if (isSent) {
      setMessages([...messages, sentMessage])
    }
  }, [isSent])

  // console.log("ckecking selected chat",selectedChat)
  return (
    <>
      {!selectedChat ? (
        <Box
          maxWidth="100%"
          h="100vh"
          display={{ lg: 'flex', base: 'none' }}
          flexDirection="column"
          alignItems="center"
        >
          <Image src={noMessageImg} alt="image" boxSize="50vh"></Image>
          <Text fontFamily="Public Sans" fontSize="2rem">
            No Chats yet ! Hurry Up Start Joining Groups
          </Text>
        </Box>
      ) : (
        <Box
          w={{ lg: `calc(100% - 500px)`, base: '100%' }}
          h={{ lg: '100%', base: '100%' }}
          order={{ base: 1, lg: 0 }}
          display={{ lg: 'flex', base: selectedChat ? 'block' : 'none' }}
          flexDirection="column"
        >
          <Box
            bg="blue"
            w={{ lg: 'full', base: '100%' }}
            h={{ base: '18vw', sm: '10vw', md: '7vw', lg: '2vw' }}
            display="flex"
            mt={{ lg: '2rem', base: '0vw' }}
            ml={{ lg: '1rem', base: '0rem' }}
            mr={{ lg: '1rem', base: '0rem' }}
            pl={{ lg: '0vw', base: '3vw' }}
            mb={{ lg: '1rem', base: '0rem' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                display={{ lg: 'none', base: 'block' }}
                onClick={() => setSelectedChat(null)}
                color="black"
                bgColor="white"
                aria-label="Search database"
                icon={<UilAngleLeft />}
              />
              <Avatar
                mr={3}
                size="md"
                name={
                  selectedChat
                    ? selectedChat.isGroupChat
                      ? selectedChat.chatName
                      : returnSender(selectedChat, user).name
                    : 'Guest User'
                }
                // src={
                //   selectedChat
                //   ? (selectedChat.isGroupChat ? selectedChat.chatName :  returnSender(selectedChat, user).name)
                //     : ''
                // }
              ></Avatar>{' '}
              <Text
                mr={3}
                fontFamily="Public Sans"
                fontSize="1rem"
                fontWeight={600}
                textColor="black"
              >
                {selectedChat &&
                  (selectedChat.isGroupChat
                    ? selectedChat.chatName
                    : returnSender(selectedChat, user).name)}
              </Text>
              <Box
                display={{ lg: 'flex', base: 'none' }}
                w="10px"
                h="10px"
                bg="green.500"
                borderRadius="full"
                alignItems="center"
                justifyContent="center"
              >
                <Box w="2px" h="2px" bg="white" borderRadius="full" />
              </Box>
            </Box>
            <Box
              w="7rem"
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
                  {/* <IconButton mr={6}> */}
                  <IconButton mr="1rem">
                    <UilSearch />
                  </IconButton>
                </PopoverTrigger>
                <PopoverContent mr={5}>
                  <PopoverBody>
                    <Input placeholder="Search your Chat" size="md" />
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <IconButton color="#74788D" bg="transparent" mr="1vw">
                <UilEye />
              </IconButton>
            </Box>
          </Box>
          <Divider w="full" />

          {/* CHAT BOX  */}
          <Box
            bg="pink"
            // maxW="100%"
            w="100%"
            overflowY="auto"
            pt={6}
            pl={6}
            // mt={6}
            // ml={6}
            // h={{lg:'calc(100% - 7vw)',sm:'calc(100% - 25vw)', base:`calc(100% - 33vw)`}}
            css={{ '::-webkit-scrollbar': { display: 'transparent' } }}
          >
            {
              <ScrollableFeed>
                <Box
                  display="flex"
                  w="100%"
                  bg="green"
                  h="100%"
                  flexDirection="column"
                >
                  {isReceived && messages ? (
                    // ? messages?.map((message, index) => {
                    messages.map((message, index) => {
                      const sameSenderMessage =
                        index >= 0 &&
                        index < messages.length - 1 &&
                        messages[index].sender._id ===
                          messages[index + 1].sender._id
                      return (
                        <SingleChatNew
                          sameSenderMessage={sameSenderMessage}
                          user={user}
                          message={message}
                          key={message._id}
                        />
                      )
                    })
                  ) : (
                    <Center fontFamily="Public Sans" fontSize="3xl" mt="35vh">
                      No Messages Yet ! Start Chatting
                    </Center>
                  )}
                </Box>
              </ScrollableFeed>
            }
          </Box>
          <Divider></Divider>

          <Box
            // bg="green"
            display="flex"
            alignItems="center"
            w="100%"
            h={{ base: '15vw', lg: '5vw' }}
            justifyContent="space-between"
          >
            <InputGroup
              borderRadius="sm"
              p={1.5}
              bgColor="#E6EBF5"
              ml={5}
              // mt={8}
              // mb={5}
              width="85%"
            >
              <Input
                value={newMessage}
                onChange={typingHandler}
                _hover={{ borderColor: 'transparent', boxShadow: 'none' }}
                focusBorderColor="transparent"
                focusShadow="none"
                type="tel"
                fontFamily="Public Sans"
                color="black"
                fontWeight={500}
                placeholder="Enter a Messsage"
              />
            </InputGroup>
            <IconButton mr="2vw" ml="2vw" mt="0.5rem">
              <UilPaperclip />
            </IconButton>
            <IconButton
              isLoading={sentMessageLoading}
              onClick={sendMessage}
              mr="4vw"
              mt={2}
            >
              <UilMessage />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  )
}

export default ChatBoxNew
