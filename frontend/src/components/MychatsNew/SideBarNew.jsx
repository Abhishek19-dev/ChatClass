 import { Avatar, Box, Image } from '@chakra-ui/react';
import React from 'react'; 
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import Logo2 from "../../animations/Logo2.png"
import { FaUser , FaUserFriends } from 'react-icons/fa';



 const SideBarNew = () =>{
return (
    <>
    <Box display='flex' h='100vh' flexDirection='column' justifyContent='space-between' alignItems='center'>
    <Image w='8vh' h='6vh' src={Logo2} />

    <Tabs  display='flex'>
  <TabList display='flex' flexDirection='column'>
    <Tab><FaUser /></Tab>
    <Tab><FaUserFriends /></Tab>
    <Tab><WarningIcon /></Tab>
    <Tab><WarningIcon /></Tab>
  </TabList>

  <TabPanels >
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
    <TabPanel>
      <p>Four!</p>
    </TabPanel>
  </TabPanels>
</Tabs>

<Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
    </Box>
    </>
)
};
 
export default SideBarNew