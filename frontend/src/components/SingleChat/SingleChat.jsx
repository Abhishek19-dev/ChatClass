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
 
 const SingleChat = ({selectedChat , setSelectedChat}) =>{
 
    // const [loading , setLoading] = useState(false)
    const [message , setMessage] = useState([])
    const [newMessage , setNewMessage] = useState('')
    const {user} = useSelector((state)=> state.loginUser)
    const dispatch = useDispatch()


    const sendMessage = async(event)=>{
    //     event.preventDefault()
    //    console.log("enter key",event.key)
    //     if(event.key === "Enter" && newMessage)
    //     {
            dispatch(sendMessageAction(newMessage , selectedChat))
        // }
    }

    //send messages:-
    const typingHandler = (e)=>{
       setNewMessage(e.target.value)
        //Typindg Indicator Login
    }
    const {isSent , message:sentMessage} = useSelector((state)=> state.sendMessage)
    useEffect(()=>{
        if(isSent)
        {
            setMessage([...message,sentMessage])
            setNewMessage("")
        }
    },[isSent])
 
    useEffect(()=>{
        if(selectedChat)
        {
            dispatch(allMessagesAction(selectedChat))
        }
       else{
        return
       }
    },[selectedChat])

    const {isReceived , loading:messageLoading , messages} = useSelector((state)=> state.allMessages)

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

            {messageLoading ? (<>
            <Spinner
             size='xl'
             w={20}
             h={20}
             alignSelf='center'
             margin='auto'
            >
            </Spinner>
            </>):(
               <div className='messages'>
                {/* {messges hre} */}
                <ScrollableChat messages={messages}/>
               </div>
            )}
            <FormControl  isRequired mt={3}>
                <Input 
                variant='filled'
                bg='#E0E0E0'
                placeholder='Enter a message'
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