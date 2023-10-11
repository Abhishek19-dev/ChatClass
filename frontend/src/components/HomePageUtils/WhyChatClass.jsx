 import { Box, Heading } from '@chakra-ui/react';
import React from 'react'; 
 
 const WhyChatClass = () =>{
return (
    <>
    <Box  h='80vh'
    mt='10vh'
    display='flex'
    flexDirection='column'
    justifyContent='space-between'
    alignItems='center'
    bgColor='#F2F8FD'>
        <Heading fontFamily='sans-serif' fontSize='6xl' mt={6} fontWeight='medium'>Why Chat Class?</Heading>
    </Box>
    </>
)
};
 
export default WhyChatClass