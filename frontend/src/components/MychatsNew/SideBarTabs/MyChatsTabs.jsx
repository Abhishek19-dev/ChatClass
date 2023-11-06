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
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { HiPhoneIncoming } from 'react-icons/hi'
import { UilSearch } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { accessChat, getAllChat, searchUser } from '../../../redux/actions/chatAction'
import { RecentChats, returnSender } from './RecentChatsUtils'
import SearchUserProfile from './SearchUserProfile'
import ChatLoading from '../../Features/ChatLoading'
import { SEARCH_USER_RESET } from '../../../redux/actionType'


const MyChatsTabs = ({ user, isActive, selectedChat, setSelectedChat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = useState('left')
  const [search , setSearch] = useState("")

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllChat(selectedChat,setSelectedChat))
  }, [user._id])

  const { allChats } = useSelector((state) => state.allChats)


  //To create a new chat
  const accessChats = (userId)=>{
    //  const user_Id = JSON.stringify(userId)
     dispatch(accessChat(userId))
     dispatch({type : SEARCH_USER_RESET})
     onClose()
     setSearch('')
}


  //search a user
  const handleSearch = (e)=>{
    if(e.target.value !== " "){
      setSearch(e.target.value)
      dispatch(searchUser(search))
    }
  }

  const {loading:searchLoading , users:searchedUsers} = useSelector((state)=> state.searchUser)
  return (
    <>
      <Box
        // bgColor="#F4F7FB"
        display="flex"
        w='full'
        h="fit-content"
        flexDir="column"
      >
        <Box display="flex" justifyContent="space-between">
          <Text
            fontFamily="Public Sans"
            textColor="#3f414D"
            ml={5}
            fontWeight={600}
            fontSize="23px"
            mt={9}
          >
            Chats
          </Text>
          <Button
            onClick={onOpen}
            w=""
            mr={3}
            mt={9}
            leftIcon={<UilSearch />}
            colorScheme="blue"
            variant="outline"
          >
            Search your Friends
          </Button>
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
                  onChange = {handleSearch}
                    _hover={{ borderColor: 'transparent', boxShadow: 'none' }}
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
                <Stack spacing={4} direction="column" maxH="100%" overflowY="auto">
                  {searchLoading ? <ChatLoading /> :
                    searchedUsers.map((search)=> (
                      <SearchUserProfile handleFunction = {()=>accessChats(search._id)} search = {search} />
                    ))
                  }
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
        <InputGroup
          borderRadius="sm"
          p={2}
          bgColor="#E6EBF5"
          ml={2}
          mt={8}
          w='380px'
          mb={5}
        >
          <InputLeftElement pointerEvents="none">
            <Icon mt={3} w={6} h={6} color="#8C8C8C">
              <UilSearch />
            </Icon>
          </InputLeftElement>
          <Input
            _hover={{ borderColor: 'transparent', boxShadow: 'none' }}
            focusBorderColor="transparent"
            focusShadow="none"
            type="tel"
            fontFamily="Public Sans"
            color="black"
            fontWeight={500}
            placeholder="Search messages or user"
          />
        </InputGroup>

        <Stack  mb={8} mt={10} ml={4} direction="row" spacing={5}>
          <Box
            position="relative"
            w="5rem"
            h="4rem"
            borderRadius="md"
            bgColor="#E6EBF5"
          >
            <Avatar
              position="absolute"
              left="18px"
              top="-23px"
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              <AvatarBadge boxSize="0.8em" bg="#2BB47D" />
            </Avatar>{' '}
            <Text
              pt={8}
              pl={3}
              fontFamily="Public Sans"
              fontSize="13px"
              fontWeight={700}
            >
              Abhishek
            </Text>
          </Box>

          <Box
            position="relative"
            w="5rem"
            h="4rem"
            borderRadius="md"
            bgColor="#E6EBF5"
          >
            <Avatar
              position="absolute"
              left="18px"
              top="-23px"
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              <AvatarBadge boxSize="0.8em" bg="#2BB47D" />
            </Avatar>{' '}
            <Text
              pt={8}
              pl={3}
              fontFamily="Public Sans"
              fontSize="13px"
              fontWeight={700}
            >
              Abhishek
            </Text>
          </Box>

          <Box
            position="relative"
            w="5rem"
            h="4rem"
            borderRadius="md"
            bgColor="#E6EBF5"
          >
            <Avatar
              position="absolute"
              left="18px"
              top="-23px"
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              <AvatarBadge boxSize="0.8em" bg="#2BB47D" />
            </Avatar>{' '}
            <Text
              pt={8}
              pl={3}
              fontFamily="Public Sans"
              fontSize="13px"
              fontWeight={700}
            >
              Abhishek
            </Text>
          </Box>

          <Box
            position="relative"
            w="5rem"
            h="4rem"
            borderRadius="md"
            bgColor="#E6EBF5"
          >
            <Avatar
              position="absolute"
              left="18px"
              top="-23px"
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              <AvatarBadge boxSize="0.8em" bg="#2BB47D" />
            </Avatar>{' '}
            <Text
              pt={8}
              pl={3}
              fontFamily="Public Sans"
              fontSize="13px"
              fontWeight={700}
            >
              Abhishek
            </Text>
          </Box>
        </Stack>

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

          <Stack mt={5} bg="#F4F7FB" h="53vh" overflowY="auto">
            {allChats
              ? allChats
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
              : 'No Chats to Show'}
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default MyChatsTabs
