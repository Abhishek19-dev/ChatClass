import React from 'react'; 
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSenderMargin, isSameUser } from '../ config/ChatLogics.jsx';
import { Avatar, Tooltip } from '@chakra-ui/react';
 
const ScrollableChat = ({ messages }) => {
  const { user } = useSelector((state) => state.loginUser);

  return (
    <>
      <ScrollableFeed>
        {messages.length > 0 && messages.map((m, i) => {
          const isCurrentUser = m.sender._id === user._id;
        //   const legalMessage = messages[i+1].sender._id === user._id

          return (
            <div style={{ display: 'flex' }} key={m._id}>
              {!isCurrentUser && !isLastMessage(messages , i , user._id) && (
                <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                  <Avatar
                    mt='7px'
                    mr={1}
                    size='sm'
                    cursor='pointer'
                    name={m.sender.name}
                    src={m.sender.avatar.url}
                  />
                </Tooltip>
              )}
              <span style={{
                backgroundColor: `${isCurrentUser ? "#BEE3F8" : "#B9F5D0"}`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10
              }}>
                {m.content}
              </span>
            </div>
          );
        })}
      </ScrollableFeed>
    </>
  );
};
 
export default ScrollableChat;
