import { Avatar, Box, Button, Icon, Image, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Logo1 from '../../animations/Logo2.png'
import studyBook from '../../animations/study-book.png'
import { FaLeanpub } from 'react-icons/fa'

const NavBar = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        h="fit-content"
        p="5px 10px 5px 10px"
      >
        <Box m="1rem" w="8rem" h="3rem">
          <Image src={Logo1}></Image>
        </Box>

        <Stack direction="row" spacing={4}>
          <Menu placement='bottom'>
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
          <Button leftIcon={<FaLeanpub />} colorScheme="blue" variant="outline">
            Start Study
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default NavBar
