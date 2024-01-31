import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UilPlus } from "@iconscout/react-unicons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { UilSearch } from "@iconscout/react-unicons";
import { UilSearchAlt } from "@iconscout/react-unicons";
import GroupChatModalNew from "./GroupChatModalNew";
import { GroupChatNameUtils } from "./GroupChatUtils";
import { useDispatch, useSelector } from "react-redux";
import { JoinGroup, addUserToGroup, getAllChat, joinGroup, searchGroup } from "../../../redux/actions/chatAction";
import { SEARCH_A_GROUP_RESET } from "../../../redux/actionType";
import ChatLoading from "../../Features/ChatLoading";

const GroupChatsTabs = ({ user, isActive, selectedChat, setSelectedChat }) => {
  const [groupInviteId, setGroupInviteId] = useState(null);
  const {user : u} = useSelector((state)=> state.loginUser)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const handleGroupSearch = () => {
    dispatch(searchGroup(groupInviteId));
    console.log("GrounpInviteId", groupInviteId);
  };
  const { allChats , loading:allChatsLoading } = useSelector((state) => state.allChats);
  const {loading : joinLoading , isJoined} = useSelector((state)=> state.joinAGroup)
  const {
    loading: searchLoading,
    group ,
    isSearched,
  } = useSelector((state) => state.searchGroup);

  const handleJoinGroup = () => {
    // const { _id } = group;
    // dispatch(JoinGroup(_id));
    dispatch(joinGroup(group,user))
  };
  
  // if(allChats){
  //   setSelectedChat(allChats[0])
  // }
 
  useEffect(()=>{
    if(isJoined){
      dispatch({
        type : SEARCH_A_GROUP_RESET
      })
      setGroupInviteId("")
    }
  })
  
  return (
    <>
      <Box bgColor="#F4F7FB" display="flex" w="100%" h="100%" flexDir="column">
        <Box display="flex" justifyContent="space-between">
          <Text
            fontFamily="Public Sans"
            textColor="#3f414D"
            ml={5}
            fontWeight={600}
            fontSize="23px"
            mt={9}
          >
            Groups
          </Text>
          {/* this is my modal for create group chat */}
          <GroupChatModalNew />
        </Box>
        <InputGroup
          borderRadius="sm"
          p={2}
          bgColor="#E6EBF5"
          mr="2vw"
          ml={{base:'2vw',md:"0.5vw"}}
          mt={8}
          mb={5}
          width="95%"
        >
          <Input
            value={groupInviteId}
            onChange={(e) => setGroupInviteId(e.target.value)}
            _hover={{ borderColor: "transparent", boxShadow: "none" }}
            focusBorderColor="transparent"
            focusShadow="none"
            type="tel"
            fontFamily="Public Sans"
            color="black"
            fontWeight={500}
            placeholder="Enter Invite Code To Join The Group"
          />
        </InputGroup>
        {group !== null &&
        group !== undefined &&
        Object.keys(group).length > 0 ? (
          <Box
            borderRadius="lg"
            alignItems="center"
            bg="#E6EBF5"
            w="95%"
            ml="0.5vw"
            h="10vh"
            p={3}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Avatar src="" name={group && group.chatName}></Avatar>
            <Box
              display="flex"
              flexDirection="column"
              w="60%"
              h="100%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              <Text fontFamily="Public Sans" fontWeight={600}>
                {group && group.chatName}
              </Text>
              <Text fontFamily="Nuntio" fontWeight={400}>
                {group.users.map((u, index) =>
                  index === group.users.length - 1
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
      group.users.map((u , index)=>(

      ))
    } */}
            <Button
            isLoading={joinLoading}
              onClick={handleJoinGroup}
              fontFamily="Public Sans"
              bgColor="white"
            >
              Join
            </Button>
          </Box>
        ) : isSearched ? (
          <Text ml="2vw" fontFamily="Nunito" fontWeight={500} color="red">
            Please Provide valid Invite Code!
          </Text>
        ) : (
          ""
        )}
        <Button
          isLoading={searchLoading}
          mt="1vw"
          bg="#CAE7FA"
          fontFamily="Nunito"
          fontWeight={300}
          colorScheme="#333333"
          variant="outline"
          w="40%"
          p={{base:'5',md:'0'}}
          ml={{base:'30vw',md:"8vw"}}
          leftIcon={<UilSearchAlt />}
          onClick={handleGroupSearch}
        >
          Search Group{" "}
        </Button>
        <Divider mt="1vh" />
        <Stack mt={5} maxH="65vh" overflowY="auto">
          {
            allChatsLoading  ? <ChatLoading /> :  allChats
              ? allChats
                  .filter((c) => c.isGroupChat)
                  .map((chat) => (
                    <GroupChatNameUtils
                      selectedChat={selectedChat}
                      setSelectedChat={setSelectedChat}
                      user={user}
                      isActive={isActive}
                      chat={chat}
                      key={chat._id}
                    />
                  ))
              : "No Chats to Show"
          }
        </Stack>
      </Box>
    </>
  );
};

export default GroupChatsTabs;
