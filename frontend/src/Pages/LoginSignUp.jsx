import React from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'

const LoginSignUp = () => {
  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          d={{base:"block",lg:"flex"}}
          justifyContent={{base:"none",lg:"center"}}
          alignItems={{base:"none",lg:"center"}}
          pl={{base:"6rem",lg:"5"}}
          bg="white"
          // bg="red"
          w="100%"
          // m="40px 0 15px 0"
          m="40px 0 20px 0"
          borderRadius="lg"
          borderWidth="1px"
        
        >
          <Text margin= {{base:"0",lg:"0.5rem 10rem"}}  fontSize= {{base:"3xl", lg:"4xl"}} fontWeight="semibold" fontFamily="work sans" color="black">
            Chat Class
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} color='black' borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign up</Tab>
            </TabList>
            <TabPanels>

              <TabPanel>
                <Login />
              </TabPanel>

              <TabPanel>
               <SignUp />
              </TabPanel>
              
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  )
}

export default LoginSignUp
