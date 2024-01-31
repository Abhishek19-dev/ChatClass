import { Avatar, AvatarBadge, Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const RecentChats = ({ chat, key, user, isActive , selectedChat , setSelectedChat }) => {

const {isOnline} = useSelector((state)=> state.loginUser)
    var sender = returnSender(chat, user)
  //  console.log("chat inside",user)
 
  return (
    <>
      <Box
        onClick={() => setSelectedChat(chat)}
        pl={1}
        pr={1}
        pb={3}
        // p={4}
        pt={3}
        bg={selectedChat && selectedChat._id === chat._id ? `#E6EBF5` : `transparent`}
        _hover={{ bg: '#E6EBF5' }}
        display="flex"
        justifyContent="space-between"
      >
        <Box maxW='100%' display="flex">
          <Avatar size="md" name={sender ? sender.name : "Guest user"} src={sender ? sender.avatar.url : ""}>
            {isOnline ? <AvatarBadge boxSize="0.8em" bg="#2BB47D" /> : ''}
          </Avatar>{' '}
          <Box  maxW='35vh' display="flex" flexDirection="column">
            <Text
              textColor="black"
              fontFamily="Public Sans"
              fontWeight={600}
              ml={5}
            >
              {sender ? sender.name : ""}
            </Text>
            <Text
              ml={5}
              fontSize="0.9rem"
              mt={1}
              maxW='100%'
              fontFamily="Public Sans"
              fontWeight={400}
              textColor="#74788D"
            >
              {chat.latestMessage ? chat.latestMessage.content : "No messages yet"}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export const returnSender = (chat, user) => {
        return chat.users[0]._id === user._id ? chat.users[1] : chat.users[0]
    }

    
 
