 import { Box , Center, Image, Text} from '@chakra-ui/react';
import React from 'react'; 
import homePageImg from '../../animations/homepage.gif'
 const FirstSection = () =>{
return (
    <>
    <Box w='100%'
    h='fit-content'
    mt='13vh'
    display='flex'
    flexDirection='row'
    justifyContent='space-between'
    bgColor='#F2F8FD'
    >
        <Box ml='13vh' mt='9vh' w='1/2'>
        <Text fontSize='7xl' fontFamily='sans-serif'>Learn Together ,<br></br> <span style={{color:'green'}}>Chat Together</span></Text>
        <Text mt={3} fontSize='4xl' fontWeight='light' fontFamily='sans-serif'>Connecting Students for Shared Learning Journeys......</Text>
        </Box>
        <Box>
            <Image w='80vh' h='65vh' src={homePageImg}/>
        </Box>
    </Box>
    </>
)
};
 
export default FirstSection