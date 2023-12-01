 import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Spinner, Text, useStatStyles } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'; 
import { getSender, getSenderFull } from '../ config/ChatLogics';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from '../Authentication/chatSection/ProfileModal';
import UpdateGroupChatModal from '../Authentication/chatSection/UpdateGroupChatModal';
import { allMessagesAction, sendMessageAction } from '../../redux/actions/messageAction';
import "./singleChat.css"
import ScrollableChat from './ScrollableChat';
import animationData from '../../animations/animation1.json'


import io from "socket.io-client"


//socket.io
const ENDPOINT = "http://localhost:8050"
var socket , selectedChatCompare;
 
 const SingleChat = ({selectedChat , setSelectedChat}) =>{
 
    const {isReceived , loading:messageLoading , messages:receivedMessages} = useSelector((state)=> state.allMessages)
    const [messages , setMessages] = useState([])
    const [newMessage , setNewMessage] = useState('')
    const [socketConnected , setSocketConnected] = useState(false)
    const [typing, setTyping] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const defaultOptions = {
        loop : true,
        autoplay : true,
        animationData : animationData,
        // rendererSettings : {
        //     preserveAspectRatio : "xMidYMid Slice"
        // },
    }

    useEffect(()=>{
        if(selectedChat && socket)
        {
            dispatch(allMessagesAction(selectedChat))
            socket.emit("join chat",selectedChat._id)
            selectedChatCompare = selectedChat //to implement whether the user is saying or not means to give notification or not (to keep backup)
        }
       else{
        return
       }
    },[selectedChat])

    useEffect(() => {
        if (receivedMessages.length > 0) {
            // Update the messages state with receivedMessages when it changes.
            setMessages(receivedMessages);
        }
    }, [receivedMessages]);

    const {user} = useSelector((state)=> state.loginUser)
    const dispatch = useDispatch()

    const sendMessage = async(event)=>{
           if(socket){
            socket.emit('stop typing',selectedChat._id)
            dispatch(sendMessageAction(newMessage , selectedChat,socket , setNewMessage))
            setNewMessage('');
           }
           else {
            console.error('Socket is not initialized yet.'); // Add an error message or handle it as needed
        }
    }

    
    //socket.io
    useEffect(()=>{
      socket = io(ENDPOINT)
      socket.on("connected",()=> setSocketConnected(true))
      socket.emit("setup",user)
      socket.on('typing',()=>setIsTyping(true))
      socket.on('stop typing',()=>setIsTyping(false))

    },[])

    // recieivng a  message using socket io
    useEffect(()=>{
        socket.on("message received",(newMessageReceived)=>{
            // console.log("old messages",messages)
            // console.log("newMessageReceived abhishek",newMessageReceived.message)
            // console.log("selected chat compate",selectedChatCompare._id)
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.message.chat._id){
                //Give notification
            }
            else{
                setMessages([...messages,newMessageReceived.message])
                // console.log("new message final message",messages)
            }
        })
    })

    

    //send messages:-
    const typingHandler = (e)=>{
       setNewMessage(e.target.value)
        //Typing Indicator Login
        if(!socketConnected) return;
        
        if(!typing){
            setTyping(true)
            socket.emit('typing',selectedChat._id)
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000
        setTimeout(()=>{
            var timeNow = new Date().getTime()
            var timeDiff = timeNow - lastTypingTime
            if(timeDiff >= timerLength && typing){
                socket.emit('stop typing',selectedChat._id)
                setTyping(false)
            }
        },timerLength)

    }
    const {isSent , message:sentMessage} = useSelector((state)=> state.sendMessage)
    useEffect(()=>{
        if(isSent)
        {
            setMessages([...messages,sentMessage])       
        }
    },[isSent])
return (
    <>
    {selectedChat ? (
        <>
        <Text
        fontSize={{base:'28px',md:'30px'}}
        pb={3}
        px={2}
        w='100%'
        fontFamily='Work sans'
        display='flex'
        justifyContent={{base : 'space-between'}}
        alignItems='center'
        >
        <IconButton
        display={{base:'flex',md:'none'}}
        icon={<ArrowBackIcon />}
        onClick={()=> setSelectedChat("")}
        >
        </IconButton>
        {selectedChat.isGroupChat ? (
            <>
               {selectedChat.chatName.toUpperCase()}
             <UpdateGroupChatModal selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
            </>
          
        ):(
            <>
             {getSender(user,selectedChat.users)}
             <ProfileModal user = {getSenderFull(user,selectedChat.users)} />
            </>
        )}
        </Text>
        <Box display='flex'
        flexDir='column'
        justifyContent='flex-end'
        p={3}
        bg='#E8E8E8'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='hidden'
        >
            {/* Messages here */}

            {/* {messageLoading ? (<>
            <Spinner
             size='xl'
             w={20}
             h={20}
             alignSelf='center'
             margin='auto'
            >
            </Spinner>
            </>):( */}
               <div className='messages'>
                {/* {messges hre} */}
                <ScrollableChat messages={messages}/>
               </div>
            {/* )} */}
            <FormControl  isRequired mt={3}>
            {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
                <Input 
                variant='filled'
                bg='#E0E0E0'
                placeholder= {newMessage == '' ? '':'Enter a message'}
                value={newMessage}
                onChange={typingHandler}
                >
                </Input>
                <Button onClick={sendMessage}>
                    Send
                </Button>
            </FormControl>
        </Box>
        </>
    ) :(
       <Box
       display='flex'
       alignItems='center'
       justifyContent='center'
       h='100%'
       >
        <Text
        fontSize='3xl'
        pb={3}
        fontFamily='Work sans'
        >
         Click on a User To start Chatting
        </Text>
       </Box>
    )}
    </>
)
};
 
export default SingleChat