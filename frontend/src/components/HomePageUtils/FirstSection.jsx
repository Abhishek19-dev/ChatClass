 import { Box , Center, Image, Text} from '@chakra-ui/react';
import React from 'react'; 
import homePageImg from '../../animations/homepage.gif'
 const FirstSection = () =>{
return (
    <>
    <Box w='100%'
    h='87.5vh'
    mt={{base:"20vw",sm:"12vw",md:"10vw",lg:"6rem"}}
    display='flex'
    flexDirection={{base:'column',md:'row'}}
    justifyContent={{md:'space-between'}}
    bg='#F8FAF4'
  
    >
        <Box   ml={{base:'5vh',md:'10vh',lg:'13vh'}}  mt={{md:'6vh',lg:'8vh'}}  w={{base:'100%',md:'1/2'}}>
        <Text fontSize={{base:'2.8rem',sm:'3rem',md:'8vw',lg:'6vw'}} ml={{base:'5vh',md:'2vh',lg:'5vh'}} fontFamily='Nunito'>Learn Together ,<br></br> <span style={{color:'green'}}>Chat Together</span></Text>
        <Text mt={3} fontSize={{base:'2xl',md:'3xl',lg:'4xl'}} fontWeight='light' fontFamily='Nunito'>Connecting Students for Shared Learning Journeys......</Text>
        </Box>
        <Box p={5}>
            <Image mr={{base:'1vh',md:'18vh',lg:'20vh'}} mt={{base:'8vh',md:'8vh',lg:'5vh'}} w={{base:'100%',md:'80vh',lg:'100vh'}} h={{base:'40vh',md:'53vh',lg:'65vh'}} src={homePageImg}/>
        </Box>
    </Box>
    </>
)
};
 
export default FirstSection