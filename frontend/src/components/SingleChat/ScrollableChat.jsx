 import React from 'react'; 
import { useSelector } from 'react-redux';
 import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../ config/ChatLogics';
import { Avatar, Tooltip } from '@chakra-ui/react';
 
 const ScrollableChat = ({messages}) =>{
    const {user} = useSelector((state)=> state.loginUser)
return (
    <>
    <ScrollableFeed>
        {messages && messages.map((m,i)=>(
             <div style={{display:'flex'}} key={m._id}>
                {
                    (isSameSender(messages , m , i , user._id) || isLastMessage(messages,i,user._id))
                     && (
                        <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                            <Avatar
                            mt='7px'
                            mr={1}
                            size='sm'
                            cursor='pointer'
                            name = {m.sender.name}
                            src= {m.sender.avatar}
                            >
                            </Avatar>
                        </Tooltip>
                     )
                }
             </div>
        ))}
    </ScrollableFeed>
    </>
)
};
 
export default ScrollableChat