 import { Avatar, AvatarBadge, Box, Button, Icon, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React from 'react'; 
import { UilUser } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom';
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilCog } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'
import { UilSignin } from '@iconscout/react-unicons'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/actions/userAction';


// This is the navbar profile Page Drop down Menu 
 export const NavbarProfileDropDown = ({isLoggedIn , isLoggedOut , user}) =>{
    const dispatch = useDispatch()
    const handleLogout = ()=>{
        console.log("handle logout")
        dispatch(logoutUser())
    }
return (
    <>
       <MenuList>
              <MenuGroup>
                {isLoggedIn ? <MenuItem>
                 <Box display='flex' >
                 <Avatar name= {user.name} src = {user.avatar.url}>
                 <AvatarBadge boxSize='1em' bg='green.500' />
                 </Avatar>
                 <Box mt={2} ml={3} display='flex' flexDirection='column' >
                  <Text fontFamily='Public Sans' fontSize='0.8rem' fontWeight={700}>{user.name}</Text>
                  <Text fontFamily='Public Sans' fontSize='0.8rem' fontWeight={400}>{user.email}</Text>
                 </Box>
                 </Box>
                </MenuItem> : "" }
                <MenuDivider />
                <MenuItem display='flex' alignItems='center'>
                <Icon mr={4}><UilUser /></Icon>
                <Text fontFamily='Public Sans' fontWeight={400}>My Profile</Text>
                </MenuItem>
                <MenuItem display='flex' alignItems='center'>
                <Icon mr={4}><UilUsersAlt /></Icon>
                <Text fontFamily='Public Sans' fontWeight={400}>My Groups</Text>
                </MenuItem>
                <MenuItem display='flex' alignItems='center'>
                <Icon mr={4}><UilCog /></Icon>
                <Text fontFamily='Public Sans' fontWeight={400}>Settings</Text>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                {
                   isLoggedIn && !isLoggedOut ? 
                <MenuItem  onClick={handleLogout} display='flex' alignItems='center'>
                <Icon mr={4}><UilSignin /></Icon> 
                <Text fontFamily='Public Sans' fontWeight={400}>Sign Out</Text>
                </MenuItem> :
                  <Link to ='/login'> <MenuItem display='flex' alignItems='center'>
                  <Icon mr={4}><UilSignout /></Icon>
                  <Text fontFamily='Public Sans' fontWeight={400}>Sign In</Text>
                  </MenuItem></Link>
                }
              </MenuGroup>
            </MenuList>    
    </>
)
};
 
