import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Box,
  Avatar,
  Text,
  Divider,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Stack,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UilEye } from "@iconscout/react-unicons";
// import { Button } from "react-scroll";
import { returnSender } from "./RecentChatsUtils";
import { useDispatch, useSelector } from "react-redux";
import { getPublicGroupUser, joinGroup } from "../../../redux/actions/chatAction";
import ChatLoading from "../../Features/ChatLoading";

const ProfileChatModal = ({ selectedChat, user, setSelectedChat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allChats } = useSelector((state) => state.allChats);
  const dispatch = useDispatch()


const {loading :groupPublicLoading , isPublicGroup , groupPublicChat} = useSelector((state)=> state.getPublicGroupUser)



  const id = returnSender(selectedChat, user)._id


  const handleEyeButton = () => {
        dispatch(getPublicGroupUser(id))
    onOpen();
  };


  return (
    <>
      <IconButton
        onClick={handleEyeButton}
        color="#74788D"
        bg="transparent"
        mr="1vw"
      >
        <UilEye />
      </IconButton>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="#E6EBF5"
          w={{ base: "90%", md: "100%" }}
          h={{ md: "80%", base: "85%" }}
          maxHeight={{ md: "100%", base: "85%" }}
          overflowY="scroll"
        >
          <ModalHeader>
            <Box
              mt={{ lg: "3vw" }}
              display="flex"
              flexDir="column"
              alignItems="center"
              h={{ lg: "10vw" }}
            >
              <Avatar
                size="lg"
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
              />
              <Text
                fontFamily="Public Sans"
                fontSize="1.2rem"
                fontWeight={500}
                textColor="black"
                mt="1vw"
              >
                {selectedChat &&
                  (selectedChat.isGroupChat
                    ? selectedChat.chatName
                    : returnSender(selectedChat, user).name)}
              </Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody  w="100%" maxH="100%">
            <Text fontFamily="Nunito Sans" fontSize={{base:'5vw',md:"1.5vw"}} fontWeight={600}>
              Groups Joined
            </Text>
            <Box w="100%" h="90%" overflowY="auto">
              <Stack mt={{base:"4vw",md:"1vw"}} direction='column' spacing='1vw'>
                {
                   groupPublicLoading ?  <ChatLoading /> : groupPublicChat.length > 0 ? (groupPublicChat.map((group)=>
                   <ProfileChatUtils group={group} user={user} />
               )) : (isPublicGroup ? <Text fontFamily='Nunito Sans' mt='4rem' fontSize='3rem' ml='4rem' fontWeight={400}>No Groups Joined!</Text> :"") 
                }
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileChatModal;






export const ProfileChatUtils = ({group , user}) => {
    const dispatch = useDispatch()
    const handleJoinButton = ()=>{
        dispatch(joinGroup(group,user))
    }

    const {loading : joinGroupLoading , isJoined} = useSelector((state)=> state.joinAGroup)

    // useEffect(()=>{
    //     if(isJoined){
    //         onClose()
    //     }
    // },[isJoined])
  return (
    <>
      <Box borderRadius='lg' p={1} display="flex" w="100%" alignItems='center' bg='white' justifyContent='space-between'>
        <Box  w='80%' display='flex' alignItems='center' flexDirection='row'>
        <Avatar
          name= {group && group.chatName}
          alignItems="center"
        //   src="https://bit.ly/dan-abramov"
        />
        <Text
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          ml="0.8rem"
        //   mt='0.8vw'
          fontFamily="Nunito Sans"
          w='90%'
        >
          {group && group.chatName}
        </Text>
        </Box>
        {
            group.users.some(groupUser => groupUser._id === user._id) ? <Text mr='0.7rem' fontFamily='Nunito Sans' fontWeight={300} fontSize='0.6rem'>Already</Text> :
            <Button _loading={joinGroupLoading} ml='0.9vw' mt='0.3vw' onClick={handleJoinButton}>Join</Button>
        }
       
      </Box>
    </>
  );
};
