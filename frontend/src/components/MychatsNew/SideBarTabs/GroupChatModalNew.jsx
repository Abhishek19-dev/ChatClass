import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
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
import {
  GroupChatSearchProfile,
  GroupChatSelectedUser,
} from "./GroupChatUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  createAGroupChat,
  searchUser,
} from "../../../redux/actions/chatAction";
import {
  CREATE_A_GROUP_CHAT_RESET,
  SEARCH_USER_RESET,
} from "../../../redux/actionType";
import ChatLoading from "../../Features/ChatLoading";

const GroupChatModalNew = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [selectedUserArray, setSelectedUserArray] = useState([]);
  const [isPublicGroupChat , setIsPublicGroupChat] = useState(true)
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  //to handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // console.log("search",e.target.value)
    dispatch(searchUser(search));
  };

  const handleDelete = (userToDelete) => {
    setSelectedUserArray(
      selectedUserArray.filter((sel) => sel._id != userToDelete._id)
    );
  };

  const handleGroup = (userToAdd) => {
    if (selectedUserArray.includes(userToAdd)) {
      toast({
        title: "User Already Added!",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUserArray([...selectedUserArray, userToAdd]);
  };

  const handleSubmit = () => {
    dispatch(createAGroupChat(selectedUserArray, chatName, groupDescription , isPublicGroupChat));
  };

  const { loading, users } = useSelector((state) => state.searchUser);
  const { loading : createGroupChatLoading , fullGroupChat, groupChatCreated } = useSelector(
    (state) => state.createGroupChat
  );

  useEffect(() => {
    console.log("full group chat ", groupChatCreated);
    if (groupChatCreated) {
      toast({
        title: "Group Chat Created Successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      dispatch({ type: CREATE_A_GROUP_CHAT_RESET });
      dispatch({ type: SEARCH_USER_RESET });
      setChatName("");
      setGroupDescription("");
      setSelectedUserArray([]);
      setSearch("");
      setSelectedUserArray([]);
      onClose();
    }
  }, [groupChatCreated]);

  const handleCloseButton = () => {
    setChatName("");
    // dispatch({type:CREATE_A_GROUP_CHAT_RESET})
    setGroupDescription("");
    setSelectedUserArray([]);
    setSearch("");
    setSelectedUserArray([]);
  };

  return (
    <>
      <Button
        fontFamily="Nunito Sans"
        fontWeight={500}
        onClick={onOpen}
        mr={3}
        mt={9}
        leftIcon={<UilPlus />}
        colorScheme="blue"
        variant="outline"
      >
        Create Group Chats
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={{ base: "90%" }}>
          <ModalHeader fontFamily="Nunito Sans" fontWeight={700}>
            Create New Group
          </ModalHeader>
          <ModalCloseButton onClick={handleCloseButton} />
          <Divider />
          <ModalBody mb={4}>
            <Box display="flex" flexDirection="column">
              <Text mt={2} mb={3} fontFamily="Public Sans" fontWeight={600}>
                Group Name
              </Text>
              <Input
                focusBorderColor="#7168EF"
                textColor="black"
                fontFamily="Nunito Sans"
                fontWeight={600}
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                opacity={0.7}
                placeholder="Enter Group Name"
                size="md"
              />

              <Text fontFamily="Public Sans" fontWeight={600} mt={7}>
                Group Members
              </Text>
              <Input
                textColor="black"
                fontFamily="Nunito Sans"
                fontWeight={600}
                mt={4}
                focusBorderColor="#7168EF"
                opacity={0.7}
                value={search}
                onChange={(e) => handleSearch(e)}
                placeholder="Add Members"
                size="md"
              />

              {/* selected users list */}
              <Box mt={5} w="100%" display="flex" flexWrap="wrap">
                {selectedUserArray.map((user) => (
                  <GroupChatSelectedUser
                    key={user._id}
                    user={user}
                    handleFunction={() => handleDelete(user)}
                  />
                ))}
              </Box>

              {/* Search user list  */}
              <Divider mt={5} />
              <Box mt={5} maxH="20vh" overflowY="auto">
                <Wrap spacing={4}>
                  {loading ? (
                    <Box
                      display="flex"
                      w="100%"
                      justifyContent="space-between"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <Box
                        w="40%"
                        bg="#E6EBF5"
                        fontFamily="Nunito Sans"
                        fontWeight={500}
                        color="black"
                        p={4}
                        borderRadius="lg"
                      >
                        Loading......
                      </Box>
                      <Box
                        w="40%"
                        bg="#E6EBF5"
                        fontFamily="Nunito Sans"
                        fontWeight={500}
                        color="black"
                        p={4}
                        borderRadius="lg"
                      >
                        Loading......
                      </Box>
                    </Box>
                  ) : (
                    users &&
                    users.length > 0 &&
                    users
                      ?.slice(0, 4)
                      .map((user) => (
                        <GroupChatSearchProfile
                          key={user._id}
                          user={user}
                          handleFunction={() => handleGroup(user)}
                        />
                      ))
                  )}
                </Wrap>
              </Box>
              <Text fontFamily="Public Sans" fontWeight={500} mt={7}>
                Group Description
              </Text>
              <Textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                mt={3}
                focusBorderColor="#7168EF"
              ></Textarea>

              <Box
                mt={7}
                p={2}
                display="flex"
                // justifyContent="space-between"
                alignItems="center"
                // bg="blue"
              >
                <Text fontFamily="Public Sans" fontWeight={600} >Public Chat</Text>
                <RadioGroup ml='5vh' defaultValue="True">
                  <Stack spacing={5} direction="row">
                    <Radio onChange={(e)=> setIsPublicGroupChat(e.target.value)} colorScheme="green" value="true">
                      Yes
                    </Radio>
                    <Radio onChange={(e)=> setIsPublicGroupChat(e.target.value)} colorScheme="red" value="false">
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button fontFamily="Public Sans" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              _hover={{ bg: "#675ED7" }}
              bg="#675ED9"
              isLoading={createGroupChatLoading}
              textColor="white"
              onClick={handleSubmit}
            >
              Create Groups
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModalNew;
