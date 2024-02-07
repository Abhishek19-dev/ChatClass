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
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UilUser } from "@iconscout/react-unicons";
import { UilEditAlt } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { editDescription, editUserProfile } from "../../../redux/actions/userAction";

const SettingsTabs = ({user , selectedChat, setSelectedChat}) => {


  const {userDetails} = useSelector((state)=> state.getUserDetails)

  
  
  const [des , setDes] = useState(userDetails.description)
  const [userEmail , setUserEmail] = useState(userDetails.email)
  const [userLocation , setUserLocation] = useState(userDetails.Location)

  const [desEdit , setDesEdit] = useState(false)
  const [profileEdit , setprofileEdit] = useState(false)
  const dispatch = useDispatch()

 

  const handleEditDescription = ()=>{
    dispatch(editDescription(des))
    setDesEdit(false)
  }

  const handleEditProfile = ()=>{
    dispatch(editUserProfile(userEmail,userLocation))
    setprofileEdit(false)
  }

  const {loading : editDescriptionLoading , editUser} = useSelector((state)=> state.editDescription)
  const {loading : editProfileLoading} = useSelector((state)=> state.editProfile)

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
              {userDetails && userDetails.name}
            </Text>
            <Box mt={2} ml={2} display="flex" alignItems="center"></Box>
          </Box>
          <Divider mt={6} />
        </Box>

        <Box p={2}  w='100%' overflowY='auto' maxH={{base:'25vw',md:'8vw'}} display='flex' justifyContent='space-between' mt={8}  pl={6} pr={6}>
          {
            !desEdit ?  <Text  fontFamily="Public Sans" textColor="#74788D">
            {userDetails && userDetails.description}
            </Text> :  <Input value={des} onChange={(e)=> setDes(e.target.value)} pl='0.5rem' mr='0.5rem' defaultValue={userDetails && userDetails.description} color='black' size='fit-content' />
            
            } 

        {!desEdit ? <IconButton onClick={()=> setDesEdit(true)}><UilEditAlt /></IconButton> : <Button _Loading={editDescriptionLoading} onClick={handleEditDescription}>Done</Button> } 
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
                       
                       {
                        !profileEdit ?  <Button
                          fontFamily="Public Sans"
                          fontWeight={500}
                          leftIcon={<UilEditAlt />}
                          bg="#EFF2F6"
                          textColor="#3F414D"
                          variant="solid"
                          onClick={setprofileEdit}
                        >
                          Edit
                        </Button> :  <Button
                          fontFamily="Public Sans"
                          fontWeight={500}
                          bg="#EFF2F6"
                          textColor="#3F414D"
                          variant="solid"
                          _loading={editProfileLoading}
                          onClick={handleEditProfile}
                        >
                          Done
                        </Button>
                       }
                      </Box>
                      <Text
                        fontFamily="Public Sans"
                        fontWeight="semibold"
                        textColor="#3F414D"
                      >
                       {userDetails && userDetails.name}
                      </Text>
                      <Text
                        fontFamily="Public Sans"
                        mt={5}
                        mb={1}
                        textColor="#74788D"
                      >
                        Email
                      </Text>
                      {profileEdit ? (
                        <Input
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          pl="0.5rem"
                          mr="0.5rem"
                          defaultValue={userDetails && userDetails.email}
                          color="black"
                          size="fit-content"
                        />
                      ) : (
                        <Text
                        fontFamily="Public Sans"
                        fontWeight="semibold"
                        textColor="#3F414D"
                        >
                         {userDetails && userDetails.email}
                        </Text>
                      )}
                      <Text
                        fontFamily="Public Sans"
                        mt={5}
                        mb={1}
                        textColor="#74788D"
                      >
                        Location
                      </Text>
                      {profileEdit ? (
                        <Input
                          value={userLocation}
                          onChange={(e) => setUserLocation(e.target.value)}
                          pl="0.5rem"
                          mr="0.5rem"
                          defaultValue={userDetails && userDetails.Location}
                          color="black"
                          size="fit-content"
                        />
                      ) : (
                        <Text
                        fontFamily="Public Sans"
                        fontWeight="semibold"
                        textColor="#3F414D"
                        >
                         {userDetails && userDetails.Location}
                        </Text>
                      )}
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
