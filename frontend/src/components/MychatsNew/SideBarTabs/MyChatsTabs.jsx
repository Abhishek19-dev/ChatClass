import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiPhoneIncoming } from "react-icons/hi";
import { UilSearch } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import {
  accessChat,
  getAllChat,
  searchUser,
} from "../../../redux/actions/chatAction";
import { RecentChats, returnSender } from "./RecentChatsUtils";
import SearchUserProfile from "./SearchUserProfile";
import ChatLoading, { OneChatLoading } from "../../Features/ChatLoading";
import { SEARCH_USER_RESET } from "../../../redux/actionType";
import RecentChatImg from "../../../images/recentChats.png";
import { allUsers } from "../../../redux/actions/userAction";

const MyChatsTabs = ({ isActive, selectedChat, setSelectedChat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const [search, setSearch] = useState("");
  const [searchResultUsers , setSearchResultUsers] = useState([])

  const { user } = useSelector((state) => state.loginUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsers())
    dispatch(getAllChat(selectedChat, setSelectedChat));
  }, [user._id]);

  const { loading :allChatsLoading ,  allChats } = useSelector((state) => state.allChats);


  //To create a new chat
  const accessChats = (userId) => {

    dispatch(accessChat(userId));
    dispatch({ type: SEARCH_USER_RESET });
    onClose();
    setSearch("");
  };

  

  useEffect(()=>{
    if(search == ""){
      setSearchResultUsers(getAllUsers)
      dispatch({ type: SEARCH_USER_RESET });
    }
  },[search])
  const {users : getAllUsers} = useSelector((state)=> state.getAllUsers)
  useEffect(()=>{
    if(getAllUsers.length > 0 ){
      const getAllExceptUsers = getAllUsers.filter((u)=> u._id != user._id)
      setSearchResultUsers(getAllExceptUsers)
    }
  },[getAllUsers])
  

  //search a user
  const handleSearch = (e) => {
    if (e.target.value !== " ") {
      setSearch(e.target.value);
      dispatch(searchUser(search));
    }
  };

  const { loading: searchLoading, users: searchedUsers } = useSelector(
    (state) => state.searchUser
  );

  useEffect(()=>{
    if(searchedUsers.length > 0){
      setSearchResultUsers(searchedUsers)
    }
  
  },[searchedUsers])
  

  return (
    <>
      <Box bgColor="#F4F7FB" display="flex" w="100%" h="100%" flexDir="column">
        <Box display="flex" justifyContent="space-between">
          <Text
            fontFamily="Public Sans"
            textColor="#3f414D"
            ml={{ lg: 5, base: "4vw" }}
            fontWeight={600}
            fontSize="23px"
            w="100%"
            mt={{ lg: 9, base: "6vw" }}
          >
            Chats
          </Text>
          <Box
            display={{ lg: "block", base: "none" }}
            w={{ lg: "80vh" }}
            pr="1vh"
            mr={{ lg: "2vh", base: "5vw" }}
            mt={{ lg: "5vh", base: "6vw" }}
            overflow="hidden"
          >
            <Button
              onClick={onOpen}
              colorScheme="blue"
              variant="outline"
              w="100%"
              whiteSpace="nowrap" // Prevent text from wrapping
            >
              <HStack>
                <Icon as={UilSearch} />
                <Text>Search your Friends</Text>
              </HStack>
            </Button>
          </Box>

          <IconButton
            mt="6vw"
            mr="3vw"
            p="1vw"
            onClick={onOpen}
            display={{ lg: "none", base: "block" }}
          >
            <UilSearch />
          </IconButton>
          <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader
                fontFamily="Public Sans"
                fontWeight={600}
                borderBottomWidth="1px"
              >
                Search Your Study Mates
              </DrawerHeader>
              <DrawerBody>
                <InputGroup
                  borderRadius="lg"
                  p={2}
                  bgColor="#E6EBF5"
                  mt={8}
                  mb={5}
                  width="18rem"
                >
                  <InputLeftElement pointerEvents="none">
                    <Icon mt={3} w={6} h={6} color="#8C8C8C">
                      <UilSearch />
                    </Icon>
                  </InputLeftElement>
                  <Input
                    value={search}
                    onChange={handleSearch}
                    _hover={{ borderColor: "transparent", boxShadow: "none" }}
                    focusBorderColor="transparent"
                    focusShadow="none"
                    type="tel"
                    fontFamily="Public Sans"
                    color="black"
                    fontWeight={500}
                    placeholder="Search Your Friends"
                  />
                </InputGroup>
                {/* To display the searched users */}
                <Stack
                  spacing={4}
                  direction="column"
                  maxH="100%"
                  overflowY="auto"
                >
                  {searchLoading ? (
                    <ChatLoading />
                  ) : (
                    // searchedUsers.map((search) => (
                    searchResultUsers.map((search) => (
                      <SearchUserProfile
                        handleFunction={() => accessChats(search._id)}
                        search={search}
                      />
                    ))
                  )}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
        <InputGroup
          borderRadius="sm"
          p={2}
          bgColor="#E6EBF5"
          ml={{ lg: 2, base: "2vw" }}
          mt={8}
          w="95%"
          mb={5}
        >
          <InputLeftElement pointerEvents="none">
            <Icon mt={3} w={6} h={6} color="#8C8C8C">
              <UilSearch />
            </Icon>
          </InputLeftElement>
          <Input
            _hover={{ borderColor: "transparent", boxShadow: "none" }}
            focusBorderColor="transparent"
            focusShadow="none"
            type="tel"
            fontFamily="Public Sans"
            color="black"
            fontWeight={500}
            placeholder="Search messages or user"
          />
        </InputGroup>


        <Box>
          <Text
            fontFamily="Public Sans"
            textColor="black"
            ml={5}
            fontWeight={600}
            fontSize="18px"
          >
            Recent
          </Text>

          <Stack    mt={5} h="68vh" overflowY="auto">
            {allChatsLoading ? <ChatLoading /> :  allChats && allChats
                .filter((c) => !c.isGroupChat).length > 0 ? (
              allChats
                .filter((c) => !c.isGroupChat)
                .map((chat) => (
                  <RecentChats
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    user={user}
                    isActive={isActive}
                    chat={chat}
                    key={chat._id}
                  />
                ))
            ) 
            : (
              <Box w="100%"  h="100%">
                <Box
                  p={3}
                  display="flex"
                  flexDirection={{base:'column',sm:'row',lg:"column"}}
                  alignItems={{base:'center',md:'none'}}
                  w="100%"
                  h={{base:'100vw',sm:'50vw',lg:"20vw"}}
                >
                  <Image src={RecentChatImg} w={{base:'70%',md:'50%',lg:"100%"}} h={{base:'100%',sm:'80%',lg:"100%"}}></Image>
                  <Box  display='flex' flexDirection='column'>
                  <Text mt="1.5vw" fontFamily="Nunito Sans" fontWeight={500}>
                    New here? No worries! 🌟 You're just two steps away from
                    making your first study buddy. 👫✨
                  </Text>
                  <Text
                    fontFamily="Nunito Sans"
                    fontWeight={400}
                    mt="1.5vw"
                    ml="1vw"
                  >
                    <Text as="span" fontWeight={700}>
                      Step 1:{" "}
                    </Text>
                    Hit the search bar, find friends who share your interests.
                    📚
                  </Text>
                  <Text
                    fontFamily="Nunito Sans"
                    fontWeight={400}
                    mt="1.5vw"
                    ml="1vw"
                  >
                    <Text as="span" fontWeight={700}>
                      Step 2:{" "}
                    </Text>{" "}
                    Say 'Hi' and kick off a study chat. 🚀 Let the learning
                    adventures begin! 🌈{" "}
                  </Text>
                  </Box>
                  
                </Box>
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default MyChatsTabs;
