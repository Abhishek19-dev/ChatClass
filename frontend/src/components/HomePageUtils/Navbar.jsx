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
import { useDispatch, useSelector } from "react-redux";
import { UilBars } from "@iconscout/react-unicons";
import { UilHome } from "@iconscout/react-unicons";
import { UilLightbulb } from "@iconscout/react-unicons";
import HomeImg from "../../animations/home.png";
import ProjectImg from "../../images/project-management.png";
import AboutImg from "../../images/information.png";
import GroupImg from "../../images/group.png";
import ContactImg from "../../images/customer-service.png";
import ProfileImg from "../../images/person.png";
import LoginImg from "../../images/key.png";
import { Link as ScrollLink } from "react-scroll";
import LogoutImg from "../../images/logout.png";

import { NavbarProfileDropDown } from "./HomePageUtils/NavbarProfileDropDown";
import MyProfileTabs from "../MychatsNew/SideBarTabs/MyProfileTabs";
import { logoutUser } from "../../redux/actions/userAction";

const NavBar = ({ selectedChat, setSelectedChat, myTabs, setMyTabs }) => {
  
  const dispatch = useDispatch()
  const {isLoggedIn , user} = useSelector((state)=> state.loginUser)
  const { isLoggedOut } = useSelector((state) => state.logoutUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("right");

  const handleLogoutFunction = () => {
    // console.log("handle logout");
    dispatch(logoutUser());
  };


  return (
    <>
      <Box
        zIndex={10}
        position="fixed"
        top="0vw"
        left="0vw"
        bg="white"
        w="100%"
        h={{ base: "20vw", sm: "12vw", md: "10vw", lg: "6rem" }}
        py={{ base: "1.5vw", md: "0.8vw", lg: "1vw" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: "2vw", lg: "1.5vw" }}
      >
        {/* Logo */}
        <Box w={{ base: "35%", sm: "30%", lg: "20%" }} h="100%">
          <Image
            w={{ base: "80%", sm: "60%", md: "50%", lg: "60%" }}
            mt={{ base: "2vw", sm: "0.6vw", md: "1.7vw", lg: "0.5vw" }}
            h={{ lg: "70%" }}
            src={Logo1}
          ></Image>
        </Box>

        {/* Navigation Icon */}
        <Box
          w={{ lg: "30%" }}
          onClick={() => onClose()}
          display={{ base: "none", lg: "flex" }}
          justifyContent="space-between"
          alignItems="center"
          h="100%"
        >
          <ScrollLink
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Text
              fontSize="1.2vw"
              fontFamily="Nunito"
              fontWeight={500}
              _hover={{ color: "green" }}
            >
              Home
            </Text>
          </ScrollLink>

          <ScrollLink
            activeClass="active"
            to="aboutUs"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Text
              fontSize="1.2vw"
              fontFamily="Nunito"
              fontWeight={500}
              _hover={{ color: "green" }}
            >
              About Us
            </Text>
          </ScrollLink>
          <ScrollLink
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Text
              fontSize="1.2vw"
              fontFamily="Nunito"
              fontWeight={500}
              _hover={{ color: "green" }}
            >
              Contact
            </Text>
          </ScrollLink>
        </Box>

        {/* RightCOrner */}
        <Stack
          w={{ md: "38%", lg: "25%" }}
          alignItems="center"
          pl={{ md: "1.5vw", lg: "3vw" }}
          h="100%"
          direction="row"
          spacing={{ md: "2vw", lg: "2.5vw" }}
        >
          
         

          {/* AVATAR DROPDOWN */}
          <Menu borderRadius="lg" placement="bottom">
            <MenuButton>
              <Avatar
                display={{ base: "none", lg: "block" }}
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
              myTabs={myTabs}
              setMyTabs={setMyTabs}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              user={user}
              isLoggedOut={isLoggedOut}
              isLoggedIn={isLoggedIn}
            />
          </Menu>

          {/* START STUDY BUTTON */}
          <Link to={!isLoggedIn ? "/login" :"/chats"}>
            <Button
              w={{ base: "85%", md: "100%", lg: "100%" }}
              leftIcon={<FaLeanpub />}
              colorScheme="blue"
              variant="outline"
            >
              Start Study
            </Button>
          </Link>

          {/* HAMBURGER MENU */}
          <Box display={{ base: "block", md: "block", lg: "none" }}>
            <IconButton
              variant="none"
              colorScheme="transparent"
              icon={<UilBars />}
              onClick={onOpen}
            />
            <Box>
              <Drawer
                display={{ lg: "none" }}
                placement={placement}
                onClose={onClose}
                isOpen={isOpen}
              >
                <DrawerOverlay />
                <DrawerContent
                  mt={{ base: "20vw", sm: "12vw", md: "10vw" }}
                  w="1rem"
                  h={{ base: "33rem", sm: "28rem", md: "30rem" }}
                >
                  <DrawerBody pt={{ base: "8vw", sm: "0.8vw", md: "1vw" }}>
                    <Stack
                      direction="column"
                      spacing={{ base: "7vw", sm: "2.8vw", md: "2vw" }}
                      pl={{ base: "4vw", sm: "2vw", md: "3vw" }}
                      pr={{ base: "4vw", md: "3vw" }}
                      pt={{ base: "3vw", md: "1.5vw" }}
                      w="90%"
                      h="90%"
                    >
                      <ScrollLink
                        activeClass="home"
                        to="home"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        onClick={onClose}
                        duration={500}
                      >
                        <Box
                          p={2}
                          border="1px solid transparent"
                          borderRadius="lg"
                          alignItems="center"
                          display="flex"
                        >
                          {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                          <Image
                            w={{ base: "5vw", sm: "3vw", md: "3vw" }}
                            h={{ base: "5vw", sm: "3vw", md: "3vw" }}
                            src={HomeImg}
                          ></Image>
                          <Text
                            ml={{ base: "5vw", sm: "3vw", md: "2vw" }}
                            mt="0.5vw"
                            fontFamily="Nunito"
                            color='darkgreen'
                            fontWeight={300}
                          >
                            HOME
                          </Text>
                        </Box>
                      </ScrollLink>

                     
                     <Link to={!isLoggedIn ? '/login':'/chats'}>
                     <Box
                        p={2}
                        border="1px solid transparent"
                        borderRadius="lg"
                        alignItems="center"
                        display="flex"
                      >
                        {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                        <Image
                          w={{ base: "5vw", sm: "3vw", md: "3vw" }}
                          h={{ base: "5vw", sm: "3vw", md: "3vw" }}
                          src={ProjectImg}
                        ></Image>
                        <Text
                          ml={{ base: "5vw", sm: "3vw", md: "2vw" }}
                          mt="0.5vw"
                          fontFamily="Nunito"
                          color='darkgreen'
                          fontWeight={300}
                        >
                          GROUPS
                        </Text>
                      </Box>
                     </Link>
                    
                      <ScrollLink
                        activeClass="active"
                        to="aboutUs"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={onClose}
                      >
                        <Box
                          p={2}
                          border="1px solid transparent"
                          borderRadius="lg"
                          alignItems="center"
                          display="flex"
                        >
                          {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                          <Image
                            w={{ base: "5vw", sm: "3vw", md: "3vw" }}
                            h={{ base: "5vw", sm: "3vw", md: "3vw" }}
                            src={AboutImg}
                          ></Image>
                          <Text
                            ml={{ base: "5vw", sm: "3vw", md: "2vw" }}
                            mt="0.5vw"
                            fontFamily="Nunito"
                            color='darkgreen'
                            fontWeight={300}
                          >
                            ABOUT US
                          </Text>
                        </Box>
                      </ScrollLink>

                      <ScrollLink
                        activeClass="active"
                        to="contact"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={onClose}
                      >
                        <Box
                          p={2}
                          border="1px solid transparent"
                          borderRadius="lg"
                          alignItems="center"
                          display="flex"
                        >
                          {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                          <Image
                            w={{ base: "5vw", sm: "3vw", md: "3vw" }}
                            h={{ base: "5vw", sm: "3vw", md: "3vw" }}
                            src={ContactImg}
                          ></Image>
                          <Text
                            ml={{ base: "5vw", sm: "3vw", md: "2vw" }}
                            mt="0.5vw"
                            fontFamily="Nunito"
                            color='darkgreen'
                            fontWeight={300}
                          >
                            CONTACT
                          </Text>
                        </Box>
                      </ScrollLink>

                      <Link to={isLoggedIn ? "/chats" : "/login"}>
                        <Box
                          // onClick={()=>  setMyTabs(<MyProfileTabs user={user} />)}
                          p={2}
                          border="1px solid transparent"
                          borderRadius="lg"
                          alignItems="center"
                          display="flex"
                        >
                          {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                          <Image
                            w={{ base: "5vw", sm: "3vw", md: "3vw" }}
                            h={{ base: "5vw", sm: "3vw", md: "3vw" }}
                            src={ProfileImg}
                          ></Image>

                          <Text
                            ml={{ base: "5vw", sm: "3vw", md: "2vw" }}
                            mt="0.5vw"
                            fontFamily="Nunito"
                            color='darkgreen'
                            fontWeight={300}
                          >
                            MY PROFILE
                          </Text>
                        </Box>
                      </Link>

                      <Divider bg="black" color="black" />
                      {
                        !isLoggedIn ?  <Link to='/login'>
                        <Box
                        p={2}
                        border="1px solid transparent"
                        borderRadius="lg"
                        alignItems="center"
                        display="flex"
                      >
                        {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                        <Image
                          w={{ base: "6vw", sm: "3vw", md: "3vw" }}
                          h={{ base: "6vw", sm: "3vw", md: "3vw" }}
                          src={LoginImg}
                        ></Image>
                        <Text
                          ml={{ base: "5vw", sm: "3vw", md: "2vw" }}
                          mt="0.5vw"
                          fontSize={{ base: "5vw", sm: "3.5vw", md: "2.2vw" }}
                          fontFamily="Nunito"
                          color='darkgreen'
                            fontWeight={500}
                        >
                          LOGIN
                        </Text>
                      </Box>
                        </Link>
                          :   <Box
                        p={2}
                        border="1px solid transparent"
                        borderRadius="lg"
                        onClick={handleLogoutFunction}
                        alignItems="center"
                        display="flex"
                      >
                        {/* <Icon w='7.5vw' h='7.5vw'><UilHome /></Icon> */}
                        <Image
                          w={{ base: "6vw", sm: "3vw", md: "3vw" }}
                          h={{ base: "6vw", sm: "3vw", md: "3vw" }}
                          src={LogoutImg}
                        ></Image>
                        <Text
                          ml={{ base: "5vw", sm: "3vw", md: "2vw" }}
                          mt="0.5vw"
                          fontSize={{ base: "5vw", sm: "3.5vw", md: "2.2vw" }}
                          fontFamily="Nunito"
                          color='darkgreen'
                            fontWeight={500}
                        >
                          LOGOUT
                        </Text>
                      </Box>
                      }
                    
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
