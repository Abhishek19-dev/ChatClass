 import { Avatar, Box, Divider, Heading, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react'; 
import {HiDotsVertical} from 'react-icons/hi'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
  import { UilUser } from '@iconscout/react-unicons'
import { useSelector } from 'react-redux';
 const MyProfileTabs = ({user}) =>{


return (
    <>
    <Box bgColor='#F4F7FB' display='flex' w='100%' mb={{base:'30vw' , lg:'10vw' }} h='100%' flexDir='column'>
    {/* <Box bgColor='#F4F7FB' display='flex' w='100%' mb={3} h='100%' flexDir='column'> */}
    {/* <Box  display='flex' w='full' mb={3} h='130vh' flexDir='column'> */}
    <Box display='flex' flexDirection='column'>
        <Box justifyContent='space-between' display='flex' mt={10}>
          <Heading fontSize='2xl' fontFamily='Public Sans' fontWeight='medium' ml={6}>My Profile</Heading>
           <Icon color='grey' boxSize={7} mr={6} mt={1}><HiDotsVertical /></Icon>
        </Box>
        <Box display='flex' flexDir='column' alignItems='center' mt={9}>
            <Avatar p='1px' borderRadius='full' borderWidth='4px' borderColor='grey.200'  size='2xl' name= {user.name} src= {user.avatar.url} />
        <Text mt={7} fontSize='1rem' fontFamily='Public Sans' fontWeight='bold'>{user.name}</Text>
        <Box
        mt={2}
    ml={2} 
    display='flex'
    alignItems='center'
  >
    <Box
      w='10px' 
      h='10px' 
      bg='green.500' 
      borderRadius='full'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        w='2px' 
        h='2px' 
        bg='white' 
        borderRadius='full'
      />
    </Box>
    <Text ml={2} color='grey' fontFamily='Public Sans' fontWeight='bold'>
      Active
    </Text>
  </Box>
  </Box>
   <Divider mt={6} />
    </Box>


    <Box mt={8} fontFamily='Public Sans'  textColor='#74788D' pl={6} pr={6}>
    Experienced web developer with a passion for crafting engaging and responsive websites. Proficient in front-end and back-end technologies, I specialize in creating user-friendly digital experiences.
    </Box>


    <Box h='100%' ml={5} mt={6} mr={5}>
  <Accordion defaultIndex={[0]} allowMultiple>
    <Box >
      <AccordionItem>
        <Box border='1px solid' borderColor='lightgray' borderRadius='sm'> {/* Add border here */}
          <AccordionButton>
            <Box display='flex' as="span" flex='1' textAlign='left'>
              <Box display='flex'>
                <Icon fontWeight='bold' mt={1}><UilUser /></Icon>
                <Text fontWeight='bold' fontFamily='Public Sans' ml={4}>About</Text>
              </Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel bgColor='white' pb={4}>
            <Box  display='flex' flexDirection='column' justifyContent='space-between'>
            <Text fontFamily='Public Sans' mt={3} mb={1} textColor='#74788D'>Name</Text>
         <Text fontFamily='Public Sans' fontWeight='semibold' textColor='#3F414D'>{user.name}</Text>
         <Text fontFamily='Public Sans' mt={5} mb={1} textColor='#74788D'>Email</Text>
         <Text fontFamily='Public Sans' fontWeight='semibold' textColor='#3F414D'>{user.email}</Text>
         <Text fontFamily='Public Sans' mt={5} mb={1} textColor='#74788D'>Location</Text>
         <Text fontFamily='Public Sans' fontWeight='semibold' textColor='#3F414D'>Tehri Garhwal ,Uk</Text>
            </Box>
          </AccordionPanel>
        </Box>
      </AccordionItem>
    </Box>
  </Accordion>
</Box>

    </Box>
    </>
)
};
 
export default MyProfileTabs