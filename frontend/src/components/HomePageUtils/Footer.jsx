import React from 'react';
import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube , FaGithub } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import LogoImg from "../../animations/Logo2.png";

const Logo = (props) => {
  return (
   <Image h={30} src={LogoImg}></Image>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

function Footer() {
  return (
    <Box
    pl={{base:'1.5rem',md:'9rem'}}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue('gray.700', 'white')} />
            </Box>
            <Text fontFamily='Nunito' fontWeight={500} fontSize={'sm'}>© 2024 ChatClass. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaGithub />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader fontFamily='Nunito' fontWeight={700}>Explore</ListHeader>
            <Box fontFamily='Nunito' fontWeight={500} as="a" href={'#'}>
              Home
            </Box>
            <Box fontFamily='Nunito' fontWeight={500} as="a" href={'#'}>
              About Us
            </Box>
            <Box fontFamily='Nunito' fontWeight={500} as="a" href={'#'}>
             Contact
            </Box>
          </Stack>
         
          <Stack pr='2rem' align={'flex-start'}>
            <ListHeader fontFamily='Nunito' fontWeight={800}>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
              fontFamily='Nunito' fontWeight={500}
              w={{base:'13rem',md:'20rem'}}
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Footer;