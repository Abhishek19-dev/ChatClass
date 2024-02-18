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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import { UilPaperclip } from "@iconscout/react-unicons";
import { UilMessage } from "@iconscout/react-unicons";
import SingleChatNew from "./SingleChatNew.jsx/SingleChatNew";
import { useDispatch, useSelector } from "react-redux";
import {
  allMessagesAction,
  sendMessageAction,
} from "../../redux/actions/messageAction";
import { returnSender } from "./SideBarTabs/RecentChatsUtils";
import ScrollableFeed from "react-scrollable-feed";
import noMessageImg from "../../animations/noMessages.jpg";
import { UilAngleLeft } from "@iconscout/react-unicons";

import io from "socket.io-client";
import ScrollContainer from "./SingleChatNew.jsx/ScrollContainer";
import { getAllChat } from "../../redux/actions/chatAction";
import GroupDescriptionModal from "./SideBarTabs/GroupDescriptionModal";
import ProfileChatModal from "./SideBarTabs/ProfileChatModal";

// /Declaratiion for socket.io
const ENDPOINT = "http://localhost:8050";
// const ENDPOINT = "https://chat-class-six.vercel.app";
var socket, selectedChatCompare;

const ChatBoxNew = ({ selectedChat, user, setSelectedChat }) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const {
    messages: receivedMessages,
    isReceived,
    loading: messageLoading,
  } = useSelector((state) => state.allMessages);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isEditing, setIsEditing] = useBoolean();
  // console.log("selected Chat inside aroudnd", selectedChat);

  //Socket.io connection
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connected", () => setSocketConnected(true));
    socket.emit("setup", user);
  }, []);

  //to join room and all messages action dispatch
  useEffect(() => {
    if (selectedChat && socket) {
      dispatch(allMessagesAction(selectedChat));
      socket.emit("join chat", selectedChat._id);
      selectedChatCompare = selectedChat; //to implement wheter to give notifications or not
    } else {
      return;
    }
  }, [selectedChat]);

  useEffect(() => {
    if (receivedMessages.length > 0) {
      setMessages(receivedMessages);
    } else {
      setMessages("");
    }
  }, [receivedMessages]);

  const sendMessage = async (event) => {
    if (socket) {
      dispatch(
        sendMessageAction(newMessage, selectedChat, socket, setNewMessage)
      );
      // if(selectedChat){
      setSelectedChat((prevSelectedChat) => ({
        ...prevSelectedChat,
        latestMessage: {
          ...prevSelectedChat.latestMessage,
          content: newMessage,
        },
      }));
      dispatch(getAllChat(selectedChat, setSelectedChat));
      console.log("new messages", newMessage);
      // }
      setNewMessage("");
    }
  };
  //Send Messages:-
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };


  const handleKeyDown = async (event) => {

    if(event.key === "Enter"){
      if (socket) {
        dispatch(
          sendMessageAction(newMessage, selectedChat, socket, setNewMessage)
        );
        // if(selectedChat){
        setSelectedChat((prevSelectedChat) => ({
          ...prevSelectedChat,
          latestMessage: {
            ...prevSelectedChat.latestMessage,
            content: newMessage,
          },
        }));
        dispatch(getAllChat(selectedChat, setSelectedChat));
        console.log("new messages", newMessage);
        // }
        setNewMessage("");
      }
    }
   
  };

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("messages before", messages);
      console.log("new message received", newMessageReceived.message);
      console.log(
        "new message received contentntntn",
        newMessageReceived.message.content
      );
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.message.chat._id
      ) {
        //Give notification
      } else {
        setMessages([...messages, newMessageReceived.message]);
        if (newMessageReceived) {
          if (selectedChat) {
            setSelectedChat((prevSelectedChat) => ({
              ...prevSelectedChat,
              latestMessage: {
                ...prevSelectedChat.latestMessage,
                content: newMessageReceived.message.content,
              },
            }));
            dispatch(getAllChat(selectedChat, setSelectedChat));
          }
        }
        // selectedChat.latestMessage.content = newMessageReceived.content
        // setMessages((prevMessages) => [...prevMessages, newMessageReceived.message]);
        // const newMessagesHereNow = Array.isArray(newMessageReceived.message)
        // ? newMessageReceived.message
        // : [newMessageReceived.message];

        // setMessages([...messages, ...newMessagesHereNow]);
      }
      console.log("final messages", messages);
    });
    // }, [messages])
  }, [messages]);

  const {
    isSent,
    message: sentMessage,
    loading: sentMessageLoading,
  } = useSelector((state) => state.sendMessage);
  useEffect(() => {
    if (isSent) {
      setMessages([...messages, sentMessage]);
    }
  }, [isSent]);

  return (
    <>
      {!selectedChat ? (
        <Box
          // maxWidth="100%"
          w={{ lg: `calc(100% - 500px)`, base: "100%" }}
          pt="4vw"
          h="100vh"
          display={{ lg: "flex", base: "none" }}
          flexDirection="column"
          alignItems="center"
        >
          <Image src={noMessageImg} alt="image" boxSize="70vh"></Image>
          <Text mt="1vh" fontFamily="Public Sans" fontSize="2.5vw">
            No Chats selected yet ! Please select any chat
          </Text>
        </Box>
      ) : (
        <Box
          w={{ lg: `calc(100% - 500px)`, base: "100%" }}
          h="100%"
          order={{ base: 1, lg: 0 }}
          display={{ lg: "flex", base: selectedChat ? "block" : "none" }}
          flexDirection="column"
          overflowY="hidden"
        >
          <Box
            w={{ lg: "full", base: "100%" }}
            // h={{ base: '18vw', sm: '10vw', md: '7vw', lg: '4vw' }}
            h={{ base: "18vw", sm: "10vw", md: "9vw", lg: "12vh" }}
            display="flex"
            pl={{ lg: "2vw", base: "3vw" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              maxWidth={{ lg: "54vw", base: "85vw", md: "60vw" }}
              display="flex"
              // bg='green'
              // justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                display={{ lg: "none", base: "block" }}
                onClick={() => setSelectedChat(null)}
                color="black"
                _hover={{ bgColor: "white" }}
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
                    : "Guest User"
                }
                src={
                  selectedChat
                    ? selectedChat.isGroupChat
                      ? selectedChat.chatName
                      : returnSender(selectedChat, user).name
                    : ""
                }
              ></Avatar>{" "}
              <Box
                display="flex"
                flexDir="column"
                maxWidth={{ lg: "92%", base: "70%", md: "80%" }}
              >
                <Text
                  mr={3}
                  fontFamily="Public Sans"
                  fontSize={{ lg: "1rem", md: "2vh" }}
                  fontWeight={600}
                  textColor="black"
                >
                  {selectedChat &&
                    (selectedChat.isGroupChat
                      ? selectedChat.chatName
                      : returnSender(selectedChat, user).name)}
                </Text>
                <Text
                  fontFamily="Public Sans"
                  fontSize={{ lg: "2vh", base: "1.5vh" }}
                  fontWeight={300}
                  textColor="A9A9A9"
                  maxWidth="100%"
                  // w='100%'
                  whiteSpace="nowrap" // Set white-space to nowrap
                  overflow="hidden" // Hide overflow
                  textOverflow="ellipsis" // Display ellipsis for overflow
                >
                  {selectedChat.isGroupChat &&
                    selectedChat &&
                    selectedChat.users.map((u, index) =>
                      index === selectedChat.users.length - 1
                        ? user._id !== u._id
                          ? `${u.name}`
                          : `You`
                        : user._id !== u._id
                        ? `${u.name} , `
                        : `You , `
                    )}
                </Text>
              </Box>
              {/* {
                selectedChat && !selectedChat.isGroupChat &&  <Box
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
              } */}
            </Box>
            <Box
              w={{ lg: "7vw", base: "12vw", sm: "16vw" }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* <Popover
                isOpen={isEditing}
                onOpen={setIsEditing.on}
                onClose={setIsEditing.off}
                closeOnBlur={false}
                isLazy
                lazyBehavior="keepMounted"
              >
                <PopoverTrigger>
                  <IconButton mr={6}>
                  <IconButton mr="1rem">
                    <UilSearch />
                  </IconButton>
                </PopoverTrigger>
                <PopoverContent mr={5}>
                  <PopoverBody>
                    <Input placeholder="Search your Chat" size="md" />
                  </PopoverBody>
                </PopoverContent>
              </Popover> */}
              {/* for displaying group chat */}
              {selectedChat && !selectedChat.isGroupChat ? (
                <ProfileChatModal
                  setSelectedChat={setSelectedChat}
                  selectedChat={selectedChat}
                  user={user}
                />
              ) : (
                <GroupDescriptionModal
                  setSelectedChat={setSelectedChat}
                  selectedChat={selectedChat}
                  user={user}
                />
              )}
            </Box>
          </Box>
          <Divider w="100%" mb="1vh" bgColor="#E6E7EA"></Divider>

          {/* From here chat box begins */}
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            // bg="#E8E8E8"
            w="100%"
            // h="100%"
            // h={{ lg: `calc(100% - 4vw)`, base: '100%' }}
            h={{ lg: `calc(100% - 12vh)`, base: "100%" }}
            maxHeight="90vh"
            borderRadius="lg"
            overflowY="hidden"
            // overflowY="scroll"
          >
            <Box
              mb="1vh"
              display="flex"
              h="100%"
              flexDir="column"
              overflowY="scroll"
            >
              <SingleChatNew messages={messages} user={user} />
            </Box>
            <Divider w="100%" mb="1vh" bgColor="#E6E7EA"></Divider>
            <Box
              // mt='1vw'
              display="flex"
              alignItems="center"
              w="100%"
              mb="1vw"
              // mt='-10vw'
              // h={{ base: '15vw', sm: '10vw', lg: '5vw' }}
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
                  onKeyDown={handleKeyDown}
                  onChange={typingHandler}
                  _hover={{ borderColor: "transparent", boxShadow: "none" }}
                  focusBorderColor="transparent"
                  focusShadow="none"
                  fontFamily="Public Sans"
                  color="black"
                  fontWeight={500}
                  placeholder="Enter a Messsage"
                />
              </InputGroup>
              {/* <IconButton mr="2vw" ml="2vw" mt="0.5rem">
                <UilPaperclip />
              </IconButton> */}
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
        </Box>
      )}
    </>
  );
};

export default ChatBoxNew;
