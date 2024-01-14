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


const MyChatsTabs = ({isActive, selectedChat, setSelectedChat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = useState('left')
  const [search , setSearch] = useState("")

  const {user} = useSelector((state)=> state.loginUser)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllChat(selectedChat,setSelectedChat))
  }, [user._id])

 
  console.log("user check",user)
  const { allChats } = useSelector((state) => state.allChats)
  console.log("allChats",allChats)


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
      bgColor='#F4F7FB'
        display="flex"
        w='100%'
        h='100%'
        flexDir="column"
      >
        <Box display="flex" justifyContent="space-between">
          <Text
            fontFamily="Public Sans"
            textColor="#3f414D"
            ml={{lg:5 , base : '4vw'}}
            fontWeight={600}
            fontSize="23px"
            w='100%'
            mt={{lg:9,base:'6vw'}}
          >
            Chats
          </Text>
          <Box
  display={{ lg: 'block', base: 'none' }}
  w={{ lg: '80vh' }}
  pr='1vh'
  mr={{ lg: '2vh', base: '5vw' }}
  mt={{ lg: '5vh', base: '6vw' }}
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
             mt='6vw' mr='3vw' p='1vw' onClick={onOpen} display={{lg:'none',base:'block'}}><UilSearch /></IconButton>
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
          ml={{lg:2,base:'2vw'}}
          mt={8}
          w='95%'
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

        {/* <Stack  mb={8} mt={10} ml={4} direction="row" spacing={7}>
          <Box
            position="relative"
            w={{base:"18vw" , lg:'5rem' , md:'20vw'}}
            h="4rem"
            borderRadius="md"
            bgColor="#E6EBF5"
          >
            <Avatar
              position="absolute"
              left={{base:"3vw",lg:'18px',md:'7vw'}}
              top="-23px"
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              {<AvatarBadge boxSize="0.8em" bg="#2BB47D" />
            </Avatar>{' '}
            <Text
              pt={8}
              pl={{lg:3 , base : '2vw' , md:'5vw'}}
              fontFamily="Public Sans"
              fontSize={{lg:"13px",base:'13px',md:'20px'}}
              fontWeight={700}
            >
              Abhishek
            </Text>
          </Box>

         <Box
            position="relative"
            w={{base:"18vw" , lg:'5rem' , md:'20vw'}}
            h="4rem"
            borderRadius="md"
            bgColor="#E6EBF5"
          >
            <Avatar
              position="absolute"
              left={{base:"3vw",lg:'18px',md:'7vw'}}
              top="-23px"
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              <AvatarBadge boxSize="0.8em" bg="#2BB47D" />
            </Avatar>{' '}
            <Text
              pt={8}
              pl={{lg:3 , base : '2vw' , md:'5vw'}}
              fontFamily="Public Sans"
              fontSize={{lg:"13px",base:'13px',md:'20px'}}
              fontWeight={700}
            >
              Abhishek
            </Text>
          </Box>
          <Box
            position="relative"
            w={{base:"18vw" , lg:'5rem' , md:'20vw'}}
            h="4rem"
            borderRadius="md"
            bgColor="#E6EBF5"
          >
            <Avatar
              position="absolute"
              left={{base:"3vw",lg:'18px',md:'7vw'}}
              top="-23px"
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              <AvatarBadge boxSize="0.8em" bg="#2BB47D" />
            </Avatar>{' '}
            <Text
              pt={8}
              pl={{lg:3 , base : '2vw' , md:'5vw'}}
              fontFamily="Public Sans"
              fontSize={{lg:"13px",base:'13px',md:'20px'}}
              fontWeight={700}
            >
              Abhishek
            </Text>
          </Box>
          <Box
            position="relative"
            w={{base:"18vw" , lg:'5rem' , md:'20vw'}}
            h="4rem"
            borderRadius="md"
            bgColor="#E6EBF5"
          >
            <Avatar
              position="absolute"
              left={{base:"3vw",lg:'18px',md:'7vw'}}
              top="-23px"
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              <AvatarBadge boxSize="0.8em" bg="#2BB47D" />
            </Avatar>{' '}
            <Text
              pt={8}
              pl={{lg:3 , base : '2vw' , md:'5vw'}}
              fontFamily="Public Sans"
              fontSize={{lg:"13px",base:'13px',md:'20px'}}
              fontWeight={700}
            >
              Abhishek
            </Text>
          </Box>
        </Stack> */}

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

          {/* <Stack mt={5} bg="#F4F7FB" h="53vh" overflowY="auto"> */}
          <Stack mt={5} h="53vh" overflowY="auto">
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
