 import { Avatar, Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react'; 
import { messageSender, sameMessageSender, sameSenderMessageForSingleChat } from './singleChatUtils';
import io from 'socket.io-client'
import ScrollableFeed from 'react-scrollable-feed';


const SingleChatNew = ({ messages, user }) => {
  return (
    <ScrollableFeed>
    <>
      {messages &&
        messages.map((message, index) => {
          return sameSenderMessageForSingleChat(messages, index, message, user) ? (
            <Box
              key={message._id}
              w='100%'
              display="flex"
              flexDirection="column"
            >
              <Box
                m="auto"
                mr='2.5rem'
                maxW='50vh'
                mb={1}
                borderRadius="lg"
                p={3}
                bg="#7168EF"
                // h="fit-content"
                textColor="white"
                position="relative"
              >
                <Box
                  zIndex="-1"
                  position="absolute"
                  right="0.02rem"
                  bottom='-2rem'
                  w={10}
                  h={10}
                  bg="#7168EF"
                  clipPath="polygon(0 0, 100% 0, 100% 100%,  100% 30%)"
                />
                <Text mr={1} mt={3}>{message.content}</Text>
              </Box>
              {sameMessageSender(messages, index) ? <Box mb={3} /> : <Box ml={10} display="flex" justifyContent='flex-end' pr={2.5}>
                <Text mr={3} fontFamily="Public Sans" fontWeight={400} mt={1}>
                  {message.sender.name.split(" ")[0]}
                </Text>
                <Avatar
                  size="sm"
                  name={message.sender.name}
                  src={message.sender.avatar.url}
                />
              </Box>}
            </Box>
          ) : (
            <Box key={message._id} position='relative' display="flex" flexDirection="column">
              <Box
                m="auto"
                ml={10}
                borderRadius="lg"
                p={3}
                bg="#7168EF"
                // h="fit-content"
                maxW='50vh'
                textColor="white"
              >
                <Box
                  zIndex="-1"
                  position="absolute"
                  left='2.5rem'
                  bottom="1.7rem"
                  w={8}
                  h={8}
                  bg="#7168EF"
                  clipPath="polygon(0 0, 100% 0, 100% 30%, 0 100%)"
                />
                <Text mt={3}>{message.content}</Text>
              </Box>
              {sameMessageSender(messages, index) ? <Box mb={3} /> : <Box display="flex">
                <Avatar
                  size="sm"
                  name={message.sender.name}
                  src={message.sender.avatar.url}
                />
                <Text fontFamily="Public Sans" fontWeight={400} mt={1.5} ml={3}>
                  {message.sender.name.split(" ")[0]}
                </Text>
              </Box>}
            </Box>
          );
        })}
    </>
    </ScrollableFeed>
  );
};

export default SingleChatNew;

