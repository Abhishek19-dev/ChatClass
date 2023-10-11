import React from 'react'
import { Provider, Carousel ,LeftButton, RightButton } from 'chakra-ui-carousel'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { FaArrowAltCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

const GroupSection = () => {
  const number = ['hero', 'zero', 'hero']
  return (
    <>
      <Box mt="10vh" ml="10vh" h='80vh'>
        <Heading fontFamily={'sans-serif'} fontWeight='medium' mb={6}>Most Popular Groups</Heading>
        <Provider>
          <Carousel gap={50}>
            {/* Here fit the group content */}

            <Card maxW="sm" h="fit-content">
              <CardBody>
                <Image
                  src="https://media.istockphoto.com/id/1130990010/photo/os-on-digital-interface-and-blue-network-background.jpg?s=612x612&w=0&k=20&c=ynl8kReC-uqWrnAlD4dBapPWhjTs3yVt0bQmo5ANPGI="
                  borderRadius="lg"
                />
                <Stack mt="6" spacing={5}>
                  <Heading size="md">Operating System</Heading>
                  <Text>
                  This is operating system chat group . Here you can find question and solution . 
                  Anyone is free to ask there questions
                  </Text>
                  <Button variant="solid" colorScheme="green">
                    Join Now
                  </Button>
                </Stack>
              </CardBody>
            </Card>

            <Card maxW="sm" h="fit-content">
              <CardBody>
                <Image
                  src="https://media.istockphoto.com/id/1130990010/photo/os-on-digital-interface-and-blue-network-background.jpg?s=612x612&w=0&k=20&c=ynl8kReC-uqWrnAlD4dBapPWhjTs3yVt0bQmo5ANPGI="
                  borderRadius="lg"
                />
                <Stack mt="6" spacing={5}>
                  <Heading size="md">Operating System</Heading>
                  <Text>
                  This is operating system chat group . Here you can find question and solution . 
                  Anyone is free to ask there questions
                  </Text>
                  <Button variant="solid" colorScheme="green">
                    Join Now
                  </Button>
                </Stack>
              </CardBody>
            </Card>

            <Card maxW="sm" h="fit-content">
              <CardBody>
                <Image
                  src="https://media.istockphoto.com/id/1130990010/photo/os-on-digital-interface-and-blue-network-background.jpg?s=612x612&w=0&k=20&c=ynl8kReC-uqWrnAlD4dBapPWhjTs3yVt0bQmo5ANPGI="
                  borderRadius="lg"
                />
                <Stack mt="6" spacing={5}>
                  <Heading size="md">Operating System</Heading>
                  <Text>
                  This is operating system chat group . Here you can find question and solution . 
                  Anyone is free to ask there questions
                  </Text>
                  <Button variant="solid" colorScheme="green">
                    Join Now
                  </Button>
                </Stack>
              </CardBody>
            </Card>

            <Card maxW="sm" h="fit-content">
              <CardBody>
                <Image
                  src="https://media.istockphoto.com/id/1130990010/photo/os-on-digital-interface-and-blue-network-background.jpg?s=612x612&w=0&k=20&c=ynl8kReC-uqWrnAlD4dBapPWhjTs3yVt0bQmo5ANPGI="
                  borderRadius="lg"
                />
                <Stack mt="6" spacing={5}>
                  <Heading size="md">Operating System</Heading>
                  <Text>
                  This is operating system chat group . Here you can find question and solution . 
                  Anyone is free to ask there questions
                  </Text>
                  <Button variant="solid" colorScheme="green">
                    Join Now
                  </Button>
                </Stack>
              </CardBody>
            </Card>

            <Card maxW="sm" h="fit-content">
              <CardBody>
                <Image
                  src="https://media.istockphoto.com/id/1130990010/photo/os-on-digital-interface-and-blue-network-background.jpg?s=612x612&w=0&k=20&c=ynl8kReC-uqWrnAlD4dBapPWhjTs3yVt0bQmo5ANPGI="
                  borderRadius="lg"
                />
                <Stack mt="6" spacing={5}>
                  <Heading size="md">Operating System</Heading>
                  <Text>
                  This is operating system chat group . Here you can find question and solution . 
                  Anyone is free to ask there questions
                  </Text>
                  <Button variant="solid" colorScheme="green" _hover={{colorScheme:'white'}}>
                    Join Now
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </Carousel>
          <Box ml='150vh' mt={5}>
          <ButtonGroup>
          <LeftButton
          bgColor="red.500"
          customIcon={<FaArrowAltCircleLeft />}
          textColor={"white.500"}
        />
        <RightButton bgColor="blue.500" customIcon={<FaArrowCircleRight />} />
          </ButtonGroup>
          </Box>
         
        </Provider>
      </Box>
    </>
  )
}

export default GroupSection
