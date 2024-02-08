import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  IconButton,
  Box,
  Avatar,
  Divider,
  Stack,
  SlideFade,
  Slide,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { UilEye } from "@iconscout/react-unicons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { UilPlus } from "@iconscout/react-unicons";
import { UilLinkAdd } from "@iconscout/react-unicons";
import {
  GroupChatAddSearchedUsers,
  GroupChatDescriptionSideDrawer,
  GroupChatEditSlide,
  GroupDescriptionModalUtils,
} from "./GroupChatUtils";
import { SearchIcon } from "@chakra-ui/icons";
import { UilPen } from "@iconscout/react-unicons";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { UilSearch } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { renameChat, searchUser } from "../../../redux/actions/chatAction";
import ChatLoading from "../../Features/ChatLoading";
import { SEARCH_USER_RESET } from "../../../redux/actionType";

const GroupDescriptionModal = ({ selectedChat, user, setSelectedChat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [newChatName, setNewChatName] = useState(selectedChat.chatName);
  const [newGroupDescription, setNewGroupDescription] = useState(selectedChat.groupDescription);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddParticipants, setShowAddParticipants] = useState(false);
  const [addUserSearch, setAddUserSearch] = useState(" ");
  const toast = useToast();

  const handleEyeButton = () => {
    onOpen();
    setShowEdit(false);
    setShowAddParticipants(false);
  };
  const handleEditButton = () => {
    setShowDialogBox(true);
    setShowAddParticipants(false);
    setShowEdit(true);
  };
  const handleAddParticipantButton = () => {
    if (user._id === selectedChat.groupAdmin._id) {
      setShowDialogBox(true);
      setShowAddParticipants(true);
      setShowEdit(false);
    } else {
      toast({
        title: `Only Admin Can Add Participants`,
        status: "warning",
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleBackButton = () => {
    setShowDialogBox(false);
    dispatch({
      type: SEARCH_USER_RESET,
    });
  };


  const handleEditDescriptionButton = ()=>{
    if (user._id === selectedChat.groupAdmin._id){
      onOpen()
      dispatch(renameChat(newChatName,newGroupDescription))
    }
    else{
      toast({
        title: `Only Admin is allowed Edit Group`,
        status: "warning",
        position: "top",
        isClosable: true,
      });
    }
  }
  //handle search user dispatch
  const dispatch = useDispatch();
  const handleAddParticipantsGroupSearch = (e) => {
    setAddUserSearch(e.target.value);
    console.log("AddUserSearch",addUserSearch)
    dispatch(searchUser(addUserSearch));
  };
  const { loading: addUsersearchLoading, users: AddUserSearched } = useSelector(
    (state) => state.searchUser
  );
  useEffect(() => {
    if (!showDialogBox) {
      setAddUserSearch(" ");
    }
  }, [showDialogBox]);

  //  console.log("selected Chat inside",selectedChat)
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
        {!showDialogBox ? (
          <ModalContent
            bg="#E6EBF5"
            w={{ base: "90%", md: "100%" }}
            h={{ md: "80%", base: "85%" }}
            maxHeight={{ md: "100%", base: "85%" }}
            overflowY="scroll"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ModalCloseButton />
              <Button
                onClick={handleEditButton}
                textColor="#144996"
                fontFamily="Public Sans"
                leftIcon={<UilPen />}
                ml="1vw"
                mt="0.8vw"
              >
                Edit
              </Button>
            </Box>
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
                  name={selectedChat.isGroupChat && selectedChat.chatName}
                  //   src="https://bit.ly/dan-abramov"
                />
                <Text
                  fontFamily="Public Sans"
                  fontSize="1.2rem"
                  fontWeight={500}
                  textColor="black"
                  mt="1vw"
                >
                  {selectedChat.chatName}
                </Text>
                <Text
                  fontFamily="Public Sans"
                  fontSize="1rem"
                  fontWeight={400}
                  textColor="black"
                >
                  {`Group : ${selectedChat.users.length} Participants`}
                </Text>
              </Box>
            </ModalHeader>
            <Divider bg="black" w="full" h="0.1vw"></Divider>
            <ModalBody>
              <Box
                h="fit-content"
                display="flex"
                justifyContent="space-between"
                flexDir="column"
              >
                <Box mb="1.4vw" maxHeight="30vw" borderRadius="lg" p={1}>
                  <Accordion allowToggle>
                    <AccordionItem bg="white">
                      <Box
                        border="1px solid"
                        borderColor="lightgray"
                        borderRadius="sm"
                      >
                        <AccordionButton bg="white" _hover={{ bg: "white" }}>
                          <Box
                            ml="1vw"
                            fontWeight={600}
                            fontFamily="Public Sans"
                            as="span"
                            flex="1"
                            textAlign="left"
                          >
                            Group Description
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <Divider></Divider>
                        <AccordionPanel
                          bg="white"
                          fontFamily="Public Sans"
                          fontWeight={400}
                          pb={4}
                        >
                          {selectedChat.groupDescription
                            ? selectedChat.groupDescription
                            : "No Description !"}
                        </AccordionPanel>
                      </Box>
                    </AccordionItem>
                  </Accordion>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  mb="-1vw"
                  justifyContent="space-between"
                >
                  <Text
                    colorScheme="transparent"
                    variant="none"
                    fontFamily="Public Sans"
                    fontWeight={400}
                    textColor="black"
                    ml="0.5vw"
                  >
                    {`${selectedChat.users.length} Participants`}
                  </Text>
                  <IconButton
                    color="black"
                    variant="none"
                    aria-label="Search database"
                    icon={<SearchIcon />}
                  />
                </Box>
                <Box
                  mt="1vw"
                  bg="white"
                  border="1 solid black"
                  w="100%"
                  borderRadius="sm"
                >
                  <Box display="flex" flexDir="column" alignItems="flex-start">
                    <Button
                      onClick={handleAddParticipantButton}
                      leftIcon={<UilPlus />}
                      colorScheme="transparent"
                      variant="none"
                      fontFamily="Public Sans"
                      fontWeight={400}
                      textColor="#144996"
                      my="0.5vw"
                    >
                      Add Participants
                    </Button>
                    <Divider bg="grey" h="0.1vw"></Divider>
                    {/* <Button
                      leftIcon={<UilLinkAdd />}
                      colorScheme="transparent"
                      variant="none"
                      fontFamily="Public Sans"
                      fontWeight={400}
                      textColor="#144996"
                      my="0.5vw"
                    >
                      Invite Code : <span  style={{ color: 'grey' , marginLeft:'0.5vw' }}>{selectedChat ? selectedChat.groupChatDetails.groupInviteId : "Private Group"}</span>
                    </Button> */}
                    <Box mx={{base:'4vw',md:'1vw'}}  my="0.5vw" display='flex' alignItems='center' flexDirection='row'>
                      <Icon color='#144996'> <UilLinkAdd /> </Icon>
                    <Text
                    ml={{base:'4vw',md:'1vw'}} 
                      fontFamily="Public Sans"
                      fontWeight={400}
                      textColor="#144996"
                    >
                      Invite Code :{" "}
                      <span style={{ color: "grey", marginLeft: "0.5vw" }}>
                        {selectedChat
                          ? selectedChat.groupChatDetails.groupInviteId
                          : "Private Group"}
                      </span>
                    </Text>
                    </Box>
                    

                    <Divider bg="grey" h="0.1vw"></Divider>
                    <Stack
                      my="0.5vw"
                      w="100%"
                      px="0.4vw"
                      direction="column"
                      spacing={2}
                    >
                      {selectedChat.users &&
                        selectedChat.users.map((u) => (
                          <GroupDescriptionModalUtils
                            setSelectedChat={setSelectedChat}
                            user={user}
                            u={u}
                            selectedChat={selectedChat}
                          />
                        ))}
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        ) : showAddParticipants && !showEdit ? (
          <ModalContent
            bg="#E6EBF5"
            w={{ md: "100%", base: "90%" }}
            h={{ lg: "40vw", base: "80%" }}
            maxHeight={{ lg: "50vw", base: "80%" }}
            // transition="transform 0.3s ease-in-out"
            // transform={showEdit ? 'translateY(0%)' : 'translateY(100%)'}
            overflowY="scroll"
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              p="1vw"
            >
              <IconButton onClick={handleBackButton} ml="0.5vw">
                <UilArrowLeft />
              </IconButton>
              <Text
                fontFamily="Public Sans"
                fontSize={{base:'5vw',md:"1.2vw"}}
                textColor="black"
                fontWeight={600}
                ml="8vh"
              >
                Add Participants
              </Text>
            </Box>
            <Divider bg="grey" w="full" h="0.1vw"></Divider>
            <ModalBody  display="flex" flexDirection="column">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <UilSearch color="#8C8C8C" />
                </InputLeftElement>
                <Input
                  value={addUserSearch}
                  onChange={handleAddParticipantsGroupSearch}
                  bg="white"
                  color="blue"
                  type="text"
                  placeholder="Search your friend by name"
                />
              </InputGroup>
              {addUsersearchLoading ? (
                <ChatLoading />
              ) : (
                <Stack mt="2vh" direction="column" spacing="3">
                  {AddUserSearched.map((u) => {
                    return (
                      <GroupChatAddSearchedUsers
                        u={u}
                        setSelectedChat={setSelectedChat}
                        selectedChat={selectedChat}
                      />
                    );
                  })}
                </Stack>
              )}
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent
            bg="#E6EBF5"
           w={{ lg: "100%", base: "80%" }}
            h={{ lg: "40vw", base: "80%" }}
            maxHeight={{ lg: "50vw", base: "100%" }}
            // transition="transform 0.3s ease-in-out"
            // transform={showEdit ? 'translateY(0%)' : 'translateY(100%)'}
            overflowY="scroll"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="1vw"
            >
              <IconButton onClick={handleBackButton} ml="0.5vw">
                <UilArrowLeft />
              </IconButton>
              <Text
                fontFamily="Public Sans"
                fontSize="1rem"
                textColor="black"
                fontWeight={600}
              >
                Edit Group
              </Text>
              <Button
                onClick={handleEditDescriptionButton}
                textColor="#144996"
                fontFamily="Public Sans"
                leftIcon={<UilPen />}
                m={2}
                mr="0.5vw"
              >
                Done{" "}
              </Button>
            </Box>
            <Divider bg="grey" w="full" h="0.1vw"></Divider>
            <ModalBody>
              <FormControl>
                <FormLabel fontFamily="Public Sans" fontWeight={500}>
                  Group Name
                </FormLabel>
                <Input value={newChatName} onChange={(e)=> setNewChatName(e.target.value)} bg="white" outline="black" type="text" />
                <FormLabel mt="1vw" fontFamily="Public Sans" fontWeight={500}>
                  Group Description
                </FormLabel>
                <Input
                  p="1vw"
                  as="textarea" // Use textarea variant
                  bg="white"
                  outline="black"
                  type="text"
                  resize="none"
                  value={newGroupDescription} onChange={(e)=> setNewGroupDescription(e.target.value)}
                  verticalAlign="top"
                  h={{base:'18rem',md:"15vw"}}
                  maxHeight="25vw"
                  overflowY="scroll"
                />
              </FormControl>
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default GroupDescriptionModal;
