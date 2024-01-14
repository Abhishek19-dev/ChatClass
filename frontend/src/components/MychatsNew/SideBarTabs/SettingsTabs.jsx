import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { UilUser } from "@iconscout/react-unicons";
import { UilEditAlt } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

const SettingsTabs = ({user , selectedChat, setSelectedChat}) => {
  // const user = useSelector((state) => state.loginUser);
  console.log("setting", user);
  return (
    <>
      <Box
        bgColor="#F4F7FB"
        display="flex"
        w="100%"
        h="100%"
        mb={{ base: "30vw", lg: "10vw" }}
        flexDir="column"
      >
        <Box display="flex" flexDirection="column">
          <Heading
            mt={10}
            fontSize="2xl"
            fontFamily="Public Sans"
            fontWeight="medium"
            ml={6}
          >
            Settings
          </Heading>

          <Box display="flex" flexDir="column" alignItems="center" mt={9}>
            <Avatar
              p="1px"
              borderRadius="full"
              borderWidth="4px"
              borderColor="grey.200"
              size="2xl"
              name={user ? user.name : ""}
              src={user ? user.avatar.url : ""}
            />
            <Text
              mt={7}
              fontSize="1rem"
              fontFamily="Public Sans"
              fontWeight="bold"
            >
              {user && user.name}
            </Text>
            <Box mt={2} ml={2} display="flex" alignItems="center"></Box>
          </Box>
          <Divider mt={6} />
        </Box>

        <Box mt={8} fontFamily="Public Sans" textColor="#74788D" pl={6} pr={6}>
          Experienced web developer with a passion for crafting engaging and
          responsive websites. Proficient in front-end and back-end
          technologies, I specialize in creating user-friendly digital
          experiences.
        </Box>

        <Box ml={5} mt={6} mr={5}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <Box>
              <AccordionItem>
                <Box
                  border="1px solid"
                  borderColor="lightgray"
                  borderRadius="sm"
                >
                  {" "}
                  {/* Add border here */}
                  <AccordionButton>
                    <Box display="flex" as="span" flex="1" textAlign="left">
                      <Box display="flex">
                        <Icon fontWeight="bold" mt={1}>
                          <UilUser />
                        </Icon>
                        <Text fontWeight="bold" fontFamily="Public Sans" ml={4}>
                          Personal Info
                        </Text>
                      </Box>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel bgColor="white" pb={4}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Text
                          fontFamily="Public Sans"
                          mt={3}
                          mb={1}
                          textColor="#74788D"
                        >
                          Name
                        </Text>
                        <Button
                          fontFamily="Public Sans"
                          fontWeight={500}
                          leftIcon={<UilEditAlt />}
                          bg="#EFF2F6"
                          textColor="#3F414D"
                          variant="solid"
                        >
                          Edit
                        </Button>
                      </Box>
                      <Text
                        fontFamily="Public Sans"
                        fontWeight="semibold"
                        textColor="#3F414D"
                      >
                       {user && user.name}
                      </Text>
                      <Text
                        fontFamily="Public Sans"
                        mt={5}
                        mb={1}
                        textColor="#74788D"
                      >
                        Email
                      </Text>
                      <Text
                        fontFamily="Public Sans"
                        fontWeight="semibold"
                        textColor="#3F414D"
                      >
                       {user && user.email}
                      </Text>
                      <Text
                        fontFamily="Public Sans"
                        mt={5}
                        mb={1}
                        textColor="#74788D"
                      >
                        Location
                      </Text>
                      <Text
                        fontFamily="Public Sans"
                        fontWeight="semibold"
                        textColor="#3F414D"
                      >
                        Tehri Garhwal ,Uk
                      </Text>
                    </Box>
                  </AccordionPanel>
                </Box>
              </AccordionItem>
            </Box>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default SettingsTabs;
