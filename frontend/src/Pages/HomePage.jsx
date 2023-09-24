import React from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'

const Home = () => {
  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={5}
          bg="red"
          w="100%"
          // m="40px 0 15px 0"
          m="40px 0 20px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="work sans" color="black">
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

export default Home
