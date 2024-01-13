import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
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
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Logo1 from "../../animations/Logo2.png";
import notificationBell from "../../animations/notification bell.png";
import { FaLeanpub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UilBars } from "@iconscout/react-unicons";
import { UilHome } from '@iconscout/react-unicons'
import { UilLightbulb } from '@iconscout/react-unicons'
import HomeImg from "../../animations/home.png"
import ProjectImg from "../../images/project-management.png"
import AboutImg from "../../images/information.png"
import GroupImg from "../../images/group.png"
import ContactImg from "../../images/customer-service.png"
import ProfileImg from "../../images/person.png"
import LoginImg from "../../images/key.png"
import LogoutImg from "../../images/logout.png"

import { NavbarProfileDropDown } from "./HomePageUtils/NavbarProfileDropDown";

const NavBar = () => {
  const { user, isLoggedIn } = useSelector((state) => state.loginUser);
  const { isLoggedOut } = useSelector((state) => state.logoutUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("right");

  return (
    <>
      {/* <Box
        position="fixed"
        zIndex={10000}
        display="flex"
        justifyContent={{ base: "none", lg: "space-between" }}
        ml={{ base: "0", md: "4" }}
        alignItems="center"
        // bg="white"
        bg="red"
        w={{ base: "100%", md: "100%" }}
        h="fit-content"
        p="5px 10px 5px 10px"
      >
        <Box m="1rem" w={{ base: "35%", md: "8rem" }} h="3rem">
          <Image w="100%" src={Logo1}></Image>
        </Box>

        <Box
          w="2/3"
          display={{ base: "none", md: "flex" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text _hover={{ color: "green", textDecoration: "underline" }} px={5}>
            Home
          </Text>
          <Text _hover={{ color: "green", textDecoration: "underline" }} px={5}>
            Groups
          </Text>
          <Text _hover={{ color: "green", textDecoration: "underline" }} px={5}>
            About Us
          </Text>
          <Text _hover={{ color: "green", textDecoration: "underline" }} px={5}>
            Contact
          </Text>
        </Box>

        <Stack
          w={{ base: "65%", md: "1/3" }}
          direction="row"
          spacing={{ base: "2", lg: "4rem" }}
        >
          <Menu display={{ base: "none", md: "block" }} placement="bottom">
            <MenuButton display={{ base: "none", md: "flex" }}>
              <Image w="6vh" h="6vh" src={notificationBell} />
            </MenuButton>
            <MenuList>
              <MenuGroup>
                <MenuItem display="flex" px={4}>
                  <Avatar
                    size="sm"
                    name="Abhishek Padiyar"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Text ml={4}>2 new messages</Text>
                </MenuItem>
              </MenuGroup>
              <Divider />
              <MenuGroup>
                <MenuItem display="flex" px={4}>
                  <Avatar
                    size="sm"
                    name="Abhishek Padiyar"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Text ml={4}>2 new messages</Text>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>

          <Menu
            display={{ base: "none", md: "block" }}
            borderRadius="lg"
            placement="bottom"
          >
            <MenuButton display={{ base: "none", md: "block" }}>
              <Avatar
                size="md"
                name={isLoggedIn ? user.name : ""}
                src={
                  isLoggedIn
                    ? user.avatar.url
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />
            </MenuButton>

            <NavbarProfileDropDown
              user={user}
              isLoggedOut={isLoggedOut}
              isLoggedIn={isLoggedIn}
            />
          </Menu>
          <Link to="/chats">
            <Button
              mr={{ base: "1", lg: "12" }}
              mt={1}
              leftIcon={<FaLeanpub />}
              colorScheme="blue"
              variant="outline"
            >
              Start Study
            </Button>
          </Link>
          <Box display={{base:"block",md:"none"}}>
            <IconButton
              variant="none"
              colorScheme="transparent"
              icon={<UilBars />}
              onClick={onOpen}
            />
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  Basic Drawer
                </DrawerHeader>
                <DrawerBody>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Stack>
      </Box> */}


      <Box zIndex={10} position='fixed' top='0vw' left='0vw' bg='white'  w="100%"  h={{base:"20vw",sm:"12vw",md:"10vw",lg:"6rem"}} py={{base:"1.5vw",md:"0.8vw",lg:"1vw"}} display='flex' justifyContent='space-between' alignItems='center' px={{base:"2vw",lg:"1.5vw"}}>
        {/* Logo */}
        <Box  w={{base:"35%",sm:"30%",lg:"20%"}}  h="100%">
        <Image w={{base:"80%",sm:"60%",md:"50%",lg:"60%"}} mt={{base:"2vw",sm:"0.6vw",md:"1.7vw",lg:"0.5vw"}} h={{lg:"70%"}} src={Logo1}></Image>
        </Box>
         
         {/* Navigation Icon */}
         <Box  w={{lg:"35%"}} display={{base:"none",lg:"flex"}} justifyContent="space-between"  alignItems="center" h="100%">
         <Text fontFamily="Public Sans" fontWeight={400} _hover={{ color: "green", textDecoration: "underline" }}>
            Home
          </Text>
          <Text fontFamily="Public Sans" fontWeight={400} _hover={{ color: "green", textDecoration: "underline" }}>
            Groups
          </Text>
          <Text fontFamily="Public Sans" fontWeight={400} _hover={{ color: "green", textDecoration: "underline" }}>
            About Us
          </Text>
          <Text fontFamily="Public Sans" fontWeight={400} _hover={{ color: "green", textDecoration: "underline" }}>
            Contact
            </Text>
         </Box>

         {/* RightCOrner */}
         <Stack  w={{md:"38%",lg:"25%"}}  alignItems='center' pl={{md:"1.5vw",lg:'3vw'}}   h="100%" direction="row" spacing={{md:"2vw",lg:"2.5vw"}}>

        {/* NOTIFICATION BELL */}
         <Menu  placement="bottom">
            <MenuButton  display={{ base: "none", md: "flex" }}>
              <Image w='2.5rem' h= '2.5rem' src={notificationBell} />
            </MenuButton>
            <MenuList>
              <MenuGroup>
                <MenuItem display="flex" px={4}>
                  <Avatar
                    size="sm"
                    name="Abhishek Padiyar"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Text ml={4}>2 new messages</Text>
                </MenuItem>
              </MenuGroup>
              <Divider />
              <MenuGroup>
                <MenuItem display="flex" px={4}>
                  <Avatar
                    size="sm"
                    name="Abhishek Padiyar"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Text ml={4}>2 new messages</Text>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>

          {/* AVATAR DROPDOWN */}
          <Menu
            borderRadius="lg"
            placement="bottom"
          >
            <MenuButton>
              <Avatar
              display={{base:"none",lg:"block"}}
                size="md"
                name={isLoggedIn ? user.name : ""}
                src={
                  isLoggedIn
                    ? user.avatar.url
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />
            </MenuButton>

            <NavbarProfileDropDown
              user={user}
              isLoggedOut={isLoggedOut}
              isLoggedIn={isLoggedIn}
            />
          </Menu>

          {/* START STUDY BUTTON */}
          <Link to="/chats">
            <Button
              w={{base:"85%",md:"100%",lg:"100%"}}
              leftIcon={<FaLeanpub />}
              colorScheme="blue"
              variant="outline"
            >
              Start Study
            </Button>
          </Link>

          {/* HAMBURGER MENU */}
          <Box display={{base:"block",md:"block",lg:"none"}}>
            <IconButton
              variant="none"
              colorScheme="transparent"
              icon={<UilBars />}
              onClick={onOpen}
            />
            <Box >
            <Drawer display={{lg:"none"}} placement={placement} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent  mt={{base:"20vw",sm:"12vw",md:"10vw"}} w='1rem'  h={{base:"33rem",sm:"28rem",md:"30rem"}}  >
                <DrawerBody pt={{base:'8vw',sm:'0.8vw',md:'1vw'}}>
                <Stack direction='column' spacing={{base:'7vw',sm:'2.8vw',md:'2vw'}}  pl={{base:'4vw',sm:'2vw',md:'3vw'}}  pr={{base:'4vw',md:'3vw'}} pt={{base:'3vw',md:'1.5vw'}} w='90%' h='90%'>
                <Box p={2} border='1px solid transparent' borderRadius='lg' alignItems='center'  display='flex'>
                 {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                <Image w={{base:'5vw',sm:'3vw',md:'3vw'}} h={{base:'5vw',sm:'3vw',md:'3vw'}} src={HomeImg}></Image>
                 <Text ml={{base:'5vw',sm:'3vw',md:'2vw'}} mt='0.5vw' fontFamily='Nunito' fontWeight={600}>HOME</Text>
                </Box>
                <Box p={2} border='1px solid transparent' borderRadius='lg' alignItems='center' display='flex'>
                 {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                 <Image w={{base:'5vw',sm:'3vw',md:'3vw'}} h={{base:'5vw',sm:'3vw',md:'3vw'}} src={ProjectImg}></Image>
                 <Text  ml={{base:'5vw',sm:'3vw',md:'2vw'}} mt='0.5vw'  fontFamily='Nunito' fontWeight={600}>PROJECTS</Text>
                </Box>
                <Box p={2} border='1px solid transparent' borderRadius='lg' alignItems='center'  display='flex'>
                 {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                 <Image w={{base:'5vw',sm:'3vw',md:'3vw'}} h={{base:'5vw',sm:'3vw',md:'3vw'}} src={AboutImg}></Image>
                 <Text  ml={{base:'5vw',sm:'3vw',md:'2vw'}} mt='0.5vw'  fontFamily='Nunito' fontWeight={600}>ABOUT US</Text>
                </Box>
                <Box p={2} border='1px solid transparent' borderRadius='lg' alignItems='center' display='flex'>
                 {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                 <Image w={{base:'5vw',sm:'3vw',md:'3vw'}} h={{base:'5vw',sm:'3vw',md:'3vw'}} src={ContactImg}></Image>
                 <Text  ml={{base:'5vw',sm:'3vw',md:'2vw'}} mt='0.5vw'  fontFamily='Nunito' fontWeight={600}>CONTACT</Text>
                </Box>
                <Box p={2} border='1px solid transparent' borderRadius='lg' alignItems='center'  display='flex'>
                 {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                 <Image w={{base:'5vw',sm:'3vw',md:'3vw'}} h={{base:'5vw',sm:'3vw',md:'3vw'}} src={ProfileImg}></Image>
                 <Text  ml={{base:'5vw',sm:'3vw',md:'2vw'}} mt='0.5vw'  fontFamily='Nunito' fontWeight={600}>MY PROFILE</Text>
                </Box>
                <Divider bg='black' color='black' />
                {/* <ButtonGroup bg='blue' p={{base:'2.5vw',sm:'1vw',md:'1vw'}} border='1px solid transparent' borderRadius='lg' w={{base:'40vw',sm:'22vw',md:'20vw'}} display='flex' alignItems='center'>
                  <Image w={{base:'7vw',sm:'4vw',md:'4vw'}} h={{base:'7vw',sm:'4vw',md:'4vw'}} src={LoginImg}></Image>
                 <Text fontFamily='Nunito Sans' fontWeight={600} fontSize={{base:'5vw',sm:'2.5vw',md:'2vw'}}>Login</Text>
                </ButtonGroup> */}
                <Box p={2} border='1px solid transparent' borderRadius='lg' alignItems='center'  display='flex'>
                 {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                 <Image w={{base:'6vw',sm:'3vw',md:'3vw'}} h={{base:'6vw',sm:'3vw',md:'3vw'}} src={LoginImg}></Image>
                 <Text  ml={{base:'5vw',sm:'3vw',md:'2vw'}} mt='0.5vw' fontSize={{base:'5vw',sm:'3.5vw',md:'2.2vw'}}  fontFamily='Nunito' fontWeight={600}>LOGIN</Text>
                </Box>
                </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            </Box>
           
          </Box>
         </Stack>
      </Box>
      <Divider />
    </>
  );
};

export default NavBar;
