import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Toast,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileModal from './ProfileModal'
import { logoutUser } from '../../../redux/actions/userAction'
import { Link, useNavigate } from 'react-router-dom'
import { accessChat, getAllChat, searchUser } from '../../../redux/actions/chatAction'
import ChatLoading from '../../Features/ChatLoading'
import UserListItem from '../../UserAvatar/UserListItem'
import { LOGOUT_RESET } from '../../../redux/actionType'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  // const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  //logout
  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch({type:LOGOUT_RESET})
  }

  const handleSearch = ()=>{
    if(!search)
    {
      toast({
        title: 'Please enter something to search!',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top-left',
      })
    }
    dispatch(searchUser(search))
  }

  const accessChats = (userId)=>{
        //  const user_Id = JSON.stringify(userId)
         dispatch(accessChat(userId))
  }
  useEffect(()=>{
    dispatch(getAllChat())
  },[dispatch,getAllChat])

  

  const { isLoggedOut } = useSelector((state) => state.logoutUser)
  const { user, isLoggedIn } = useSelector((state) => state.loginUser)
  const { users:searchedUsers } = useSelector((state) => state.searchUser)
  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/login')
    }
  },[isLoggedIn,navigate])
  // setSearchResult(...searchedUsers)
  console.log(searchResult)
  useEffect(() => {
    if (isLoggedOut) {
      navigate('/login')
      toast({
        title: 'Logged Out Successfully!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }, [isLoggedIn, navigate])


  const {loading , users} = useSelector((state)=> state.searchUser)
  const {loading:loadingCreateChat} = useSelector((state)=> state.accessChat)

  
  
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip hasArrow placement="bottom-end" label="search Users To chat">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text display={{ base: 'none', md: 'flex' }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work-sans">
          ChatClass
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.avatar.url}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>

              <MenuDivider></MenuDivider>

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
          <Box display="flex" pb="2">
            <Input
              placeholder="Search By name or Email"
              mr={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button isLoading = {loading} onClick={handleSearch}>Go</Button>
          </Box>

          {loading ? (
            <ChatLoading />
          ):(
            searchedUsers?.map((user)=>(
               <UserListItem key = {user._id} user={user} handleFunction = {()=>accessChats(user._id)}>
               </UserListItem>
            ))
          )}
          {loadingCreateChat && <Spinner ml='auto' display='flex'></Spinner>}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer
