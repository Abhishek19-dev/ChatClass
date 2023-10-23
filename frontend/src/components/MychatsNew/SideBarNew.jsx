 import { Avatar, Box, Button, Divider, Icon, IconButton, Image, TabIndicator, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react'; 
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Logo2 from "../../animations/Logo2.png"
import { UilUser } from '@iconscout/react-unicons'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilHipchat } from '@iconscout/react-unicons'
import { UilSetting } from '@iconscout/react-unicons'
import MyProfileTabs from './SideBarTabs/MyProfileTabs';
import MyChatsTabs from './SideBarTabs/MyChatsTabs';
import GroupChatsTabs from './SideBarTabs/GroupChatsTabs';
import SettingsTabs from './SideBarTabs/SettingsTabs';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { UilFileInfoAlt } from '@iconscout/react-unicons'
import { UilCog } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';




 const SideBarNew = ({selectedChat , setSelectedChat}) =>{
  
  const {user , isActive} = useSelector((state)=> state.loginUser)
      
return (
    <>
    <Box  position= 'relative' display='flex' h='100vh' w='fit-content' flexDirection='column' justifyContent='space-between'>
      <Link to = '/'>
      <Image ml={5} mr={3} mt={6} w='8vh' h='6vh' src={Logo2} />
      </Link>
  
    <Tabs  display='flex'>
  <TabList display='flex' flexDirection='column'>
  <Divider color='lightblue' />
    <Tooltip hasArrow placement='top' label = 'Profile'> 
    <Tab _hover={{
    border: '1px',
    borderColor: '#A3ECD2', // Change to the desired shade of blue
    borderRadius: 'md', // You can adjust the border radius
    backgroundColor: '#A3ECD2', // Change to the desired shade of blue
  }} 
   _selected={{
    border: '1px',
    borderColor: '#A3ECD2', // Change to the desired shade of blue
    borderRadius: 'md', // You can adjust the border radius
    backgroundColor: '#A3ECD2', // Change to the desired shade of blue
  }} 
  isFitted my={5} ml={4}><UilUser  /></Tab>
    </Tooltip>

    <Tooltip hasArrow placement='top' label = 'Chats'> 
    <Tab _hover={{
    border: '1px',
    borderColor: '#A3ECD2', // Change to the desired shade of blue
    borderRadius: 'md', // You can adjust the border radius
    backgroundColor: '#A3ECD2', // Change to the desired shade of blue
  }} 
   _selected={{
    border: '1px',
    borderColor: '#A3ECD2', // Change to the desired shade of blue
    borderRadius: 'md', // You can adjust the border radius
    backgroundColor: '#A3ECD2', // Change to the desired shade of blue
  }} 
    my={5} ml={4}><UilHipchat /></Tab>
    </Tooltip>

    <Tooltip hasArrow placement='top' label = 'Groups'> 
    <Tab _hover={{
    border: '1px',
    borderColor: '#A3ECD2', // Change to the desired shade of blue
    borderRadius: 'md', // You can adjust the border radius
    backgroundColor: '#A3ECD2', // Change to the desired shade of blue
  }} 
   _selected={{
    border: '1px',
    borderColor: '#A3ECD2', // Change to the desired shade of blue
    borderRadius: 'md', // You can adjust the border radius
    backgroundColor: '#A3ECD2', // Change to the desired shade of blue
  }} 
  isFitted my={5} ml={4}><UilUsersAlt /></Tab>
    </Tooltip>

    <Tooltip hasArrow placement='top' label = 'Settings'> 
    <Tab _hover={{
    border: '1px',
    borderColor: '#A3ECD2', // Change to the desired shade of blue
    borderRadius: 'md', // You can adjust the border radius
    backgroundColor: '#A3ECD2', // Change to the desired shade of blue
  }} 
   _selected={{
    border: '1px',
    borderColor: '#A3ECD2', // Change to the desired shade of blue
    borderRadius: 'md', // You can adjust the border radius
    backgroundColor: '#A3ECD2', // Change to the desired shade of blue
  }} 
  isFitted my={5} ml={4}><UilSetting /></Tab>
    </Tooltip>
    <Divider />
  </TabList>
  <TabPanels  position='absolute' top='-31vh' left='10vh'>
    <TabPanel >
      <MyProfileTabs user={user} />
    </TabPanel>

    <TabPanel>
      <MyChatsTabs selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} isActive = {isActive} />
    </TabPanel>

    <TabPanel>
      <GroupChatsTabs />
    </TabPanel>

    <TabPanel>
     <SettingsTabs />
    </TabPanel>

  </TabPanels>
</Tabs>

<Menu>
  <MenuButton
    transition='all 0.2s'
  >
  <Avatar  mb={6} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
  </MenuButton>
  <MenuList ml={16}>
    <MenuItem>
    <Box display='flex' alignItems='center' justifyContent='space-between'  w='full'>
       <Button  bg='transparent' _hover={{bg:'transparent'}} fontFamily='Public Sans' fontWeight={400}>Profile</Button>
      <Icon><UilFileInfoAlt /></Icon>
    </Box>
    </MenuItem>
    <MenuItem>
    <Box display='flex' alignItems='center' justifyContent='space-between'  w='full'>
    <Button bg='transparent' _hover={{bg:'transparent'}} fontFamily='Public Sans' fontWeight={400}>Settings</Button>
      <Icon><UilCog /></Icon>
    </Box>
    </MenuItem>
    <MenuDivider />
    <MenuItem>
    <Box display='flex' alignItems='center' justifyContent='space-between'  w='full'>
    <Button bg='transparent' _hover={{bg:'transparent'}} fontFamily='Public Sans' fontWeight={400}>Log Out</Button>
      <Icon><UilSignout /></Icon>
    </Box>
    </MenuItem>
  </MenuList>
</Menu>

    </Box>
    </>
)
};
 
export default SideBarNew