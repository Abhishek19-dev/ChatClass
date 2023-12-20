import {
  Avatar,
  Box,
  Button,
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

import { NavbarProfileDropDown } from "./HomePageUtils/NavbarProfileDropDown";

const NavBar = () => {
  const { user, isLoggedIn } = useSelector((state) => state.loginUser);
  const { isLoggedOut } = useSelector((state) => state.logoutUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("right");

  return (
    <>
      <Box
        position="fixed"
        zIndex={10000}
        display="flex"
        justifyContent={{ base: "none", lg: "space-between" }}
        ml={{ base: "0", md: "4" }}
        alignItems="center"
        // bg="white"
        // bg="red"
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
          spacing={{ base: "2", lg: "8" }}
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
          <Box>
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
      </Box>
    </>
  );
};

export default NavBar;
