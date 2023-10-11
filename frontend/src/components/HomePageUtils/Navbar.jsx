import {
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import Logo1 from '../../animations/Logo2.png'
import studyBook from '../../animations/study-book.png'
import searchBox from '../../animations/search.svg'
import notificationBell from '../../animations/notification bell.png'
import { FaLeanpub } from 'react-icons/fa'

const NavBar = () => {
  return (
    <>
      <Box
        position='fixed'
        zIndex={10000}
        display="flex"
        justifyContent='space-between'
        ml={4}
        alignItems="center"
        bg="white"
        w="100%"
        h="fit-content"
        p="5px 10px 5px 10px"
      >
        <Box m="1rem" w="8rem" h="3rem">
          <Image src={Logo1}></Image>
        </Box>
        
        <Box w='2/3' display='flex' justifyContent='space-between' alignItems='center'>
          <Text  _hover={{color:'green',textDecoration:'underline'}} px={5}>Home</Text>
          <Text _hover={{color:'green',textDecoration:'underline'}} px={5}>Groups</Text>
          <Text _hover={{color:'green',textDecoration:'underline'}} px={5}>About Us</Text>
          <Text _hover={{color:'green',textDecoration:'underline'}} px={5}>Contact</Text>
        </Box>
        {/* <Box w='2/3'> */}
        {/* <InputGroup w='80vh'> */}
    {/* <InputLeftElement pointerEvents='none'> */}
      {/* <PhoneIcon color='gray.300' /> */}
      {/* <Image w={6} h={6} src={searchBox} /> */}
    {/* </InputLeftElement> */}
    {/* <Input borderColor='blue.300' pl={10} h='6vh' type='text' placeholder='Search Groups or users' /> */}
  {/* </InputGroup> */}
        {/* </Box> */}

        <Stack w='1/3' direction="row" spacing={8}>
        <Menu placement="bottom">
            <MenuButton>
            <Image w='6vh' h='6vh' src={notificationBell}/>
            </MenuButton>
            <MenuList>
              <MenuGroup>
                <MenuItem display='flex' px={4}><Avatar
                size="sm"
                name="Abhishek Padiyar"
                src="https://bit.ly/tioluwani-kolawole"
              />
              <Text ml={4}>1 new messages</Text></MenuItem>
              </MenuGroup>
              <Divider />
              <MenuGroup>
                <MenuItem display='flex' px={4}><Avatar
                size="sm"
                name="Abhishek Padiyar"
                src="https://bit.ly/tioluwani-kolawole"
              />
              <Text ml={4}>2 new messages</Text></MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>

          <Menu placement="bottom">
            <MenuButton>
              <Avatar
                size="md"
                name="Abhishek Padiyar"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </MenuButton>
            <MenuList>
              <MenuGroup>
                <MenuItem>My Profile</MenuItem>
                <MenuItem>My groups </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem>Logout</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          <Button mr={12} mt={1} leftIcon={<FaLeanpub />} colorScheme="blue" variant="outline">
            Start Study
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default NavBar
