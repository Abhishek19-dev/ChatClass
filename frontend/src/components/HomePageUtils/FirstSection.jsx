 import { Box , Center, Image, Text} from '@chakra-ui/react';
import React from 'react'; 
// import homePageImg from '../../images/homepage.gif'
import homePageImg from '../../images/studyClassImg.jpg'
 const FirstSection = () =>{
return (
    <>
    <Box id='home' w='100%'
    h={{base:'87.5vh',md:'80vh',lg:'87.5vh'}}
    mt={{base:"20vw",sm:"12vw",md:"10vw",lg:"6rem"}}
    display='flex'
    flexDirection={{base:'column',md:'row'}}
    justifyContent={{md:'space-between'}}
    bg='#F8FAF4'
  
    >
        <Box   h={{base:'28vh',md:'40vh'}}   mt={{md:'6vh',lg:'8vh'}}  w={{base:'100%',md:'1/2'}}>
        <Text fontSize={{base:'2.8rem',sm:'3rem',md:'8vw',lg:'6vw'}} ml={{base:'6vh',sm:'10vh',md:'2vh',lg:'5vh'}} fontFamily='Nunito'>Learn Together ,<br></br> <span style={{color:'green'}}>Chat Together</span></Text>
        <Text mt={3} fontSize={{base:'2xl',md:'3xl',lg:'4xl'}}  ml={{base:'6vh',sm:'8vh',md:'2vh',lg:'5vh'}} fontWeight='light' fontFamily='Nunito'>Connecting Students for Shared Learning Journeys......</Text>
        </Box>
        <Box  p={{base:'1',lg:'5'}}  w='100%' h={{base:'40vh',md:'100%'}}>
            <Image mr={{base:'1vh',md:'18vh',lg:'20vh'}} ml={{base:'0vh',sm:'6vh',md:'0vh',lg:'0vh'}} mt={{base:'4vh',md:'8vh',lg:'1vh'}} w={{base:'100%',sm:'80%',md:'80vh',lg:'100vh'}} h={{base:'100%',md:'30vh',lg:'80vh'}} src={homePageImg}/>
        </Box>
    </Box>
    </>
)
};
 
export default FirstSection