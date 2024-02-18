

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
  ButtonGroup,
  Image,
} from "@chakra-ui/react";
import { BsGithub, BsLinkedin, BsPerson, BsTwitter , BsInstagram } from "react-icons/bs";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { UilUser } from "@iconscout/react-unicons";
import { UilEnvelopeMinus } from "@iconscout/react-unicons";
import { UilPhone } from "@iconscout/react-unicons";
import { UilCommentAltDots } from "@iconscout/react-unicons";
import { UilMessage } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const { hasCopied, onCopy } = useClipboard("example@example.com");

  return (
    <>
      <Box id="contact" display="flex" mt={{base:'10vw',md:'5vw'}} bg='#F8FAF4' p={2} minH={{base:'120vw',md:"35vw"}}  w="100%">
        <Box
          w="100%"
          p={{base:'0.1rem',md:"1rem"}}
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Text mb={{base:'2vw',md:'2vw'}}  fontFamily="Nunito" fontWeight={800} fontSize={{base:'2rem',md:"3rem"}}>
            Get In Touch
          </Text>
          <Box
            w={{base:'95%',md:"60vw"}}
            justifyContent="center"
            h={{base:'120vw',md:"40vw"}}
            display="flex"
            flexDirection={{base:'column',md:'row'}}
            bg='#E7F2E6'
            alignItems="center"
          >
            <Box
              w={{base:'95%',md:"10vw"}}
              mt={{base:'3vw',md:"0"}}
              h={{base:'20vw',md:"38vw"}}
              order={{base:'2',md:'1'}}
              display="flex"
              bg='transparent'
              flexDirection={{base:'row',md:"column"}}
              alignItems={{base:'center',md:'flex-end'}}
              pr='1vw'
              justifyContent='space-around'
            >
                <Link to='https://github.com/Abhishek19-dev'>
                <IconButton color='green.500'  _hover={{bg:"#F7FAF3"}} w={{base:'10vw',md:'4vw'}} h={{base:'10vw',md:'4vw'}} p='1vw' border='1px solid transparent' borderRadius='full'><BsGithub size='sm' /></IconButton>
                </Link>
               
                <IconButton color='green.500'  _hover={{bg:"#F7FAF3"}} w={{base:'10vw',md:'4vw'}} h={{base:'10vw',md:'4vw'}} p='1vw' border='1px solid transparent' borderRadius='full'><BsInstagram size='sm' /></IconButton>

                <Link to='https://www.linkedin.com/in/abhishekpadiyar12/'>
                <IconButton color='green.500'  _hover={{bg:"#F7FAF3"}} w={{base:'10vw',md:'4vw'}} h={{base:'10vw',md:'4vw'}} p='1vw' border='1px solid transparent' borderRadius='full'><BsLinkedin size='sm' /></IconButton>
                </Link>
                
                <Link to='https://twitter.com/AbhishekPa16256'>
                <IconButton color='green.500'  _hover={{bg:"#F7FAF3"}} w={{base:'10vw',md:'4vw'}} h={{base:'10vw',md:'4vw'}} p='1vw' border='1px solid transparent' borderRadius='full'><BsTwitter size='sm' /></IconButton>
                </Link>
               
            </Box>
            <Stack   order={{base:'1',md:'2'}} bg='#F7FAF3' border='1px solid transparent' borderRadius='lg' spacing='2vw' p={{base:'3',md:'5'}}  w={{base:'90vw',md:"40vw"}} h={{base:'95vw',md:"38vw"}}>
              <FormControl mt={{base:'3vw', md:'0vw'}} isRequired>
                <FormLabel fontFamily='Nunito' fontWeight={500}>Name</FormLabel>
                <InputGroup>
                <InputLeftElement><UilUser /></InputLeftElement>
                <Input fontFamily='Nunito' fontWeight={500}  placeholder="Your Name" />
                </InputGroup>
              </FormControl>

              <FormControl mt={{base:'3vw', md:'0vw'}} isRequired>
                <FormLabel fontFamily='Nunito' fontWeight={500}>Email</FormLabel>
                <InputGroup>
                <InputLeftElement><UilEnvelopeMinus /></InputLeftElement>
                <Input fontFamily='Nunito' fontWeight={500} type="email"  placeholder="Your Email" />
                </InputGroup>
              </FormControl>

              <FormControl mt={{base:'3vw', md:'0vw'}} isRequired>
                <FormLabel fontFamily='Nunito' fontWeight={500}>Messages</FormLabel>
                <InputGroup>
                <Textarea fontFamily='Nunito' placeholder="Your Messages" h={{base:'20vw',md:'15vw'}}   />
                </InputGroup>
              </FormControl>
             <Button p={4} w='8rem' ml={{base:'44vw',md:'28vw'}}  fontFamily='Nunito' fontWeight={600} leftIcon={<UilMessage />}>Send</Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
