import { Box, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import focusImg from "../../images/focus.png";
import learningImg from "../../images/study-literature.png";
import collaborativeImg from "../../images/developer-team.png";

const WhyChatClass = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        h={{ base: "255vw",md:'70vh', lg: "100vh" }}
        // bg="#F8FAF4"
        bg={useColorModeValue('gray.50', 'gray.900')}
        //   bg='pink'
        alignItems="center"
        w="100%"
      >
        <Heading
          fontSize={{base:'10vw',md:"4vw"}}
          fontFamily="Nunito"
          fontWeight={700}
          color="black"
          mt="2vw"
        >
          Why Chat Class ?
        </Heading>
        <Stack
          mt={{ base: "2vw", lg: "2vw" }}
          pt={{ base: "3vw", lg: "2vw" }}
          pb={{ base: "2vw", lg: "1vw" }}
          pl={{ base: "7vw",sm:'18vw', md:'5vw',lg: "5vw" }}
          w="100%"
          // maxH={{base:'100vh',md:"90%"}}
          h={{ base: "100%", md: "100%" }}
          // bg="black"
          // p="2vw"
          direction={{ base: "column", md: "row" }}
          spacing="3vw"
        >
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid transparent"
            borderRadius="xl"
            h={{ base: "18rem",sm:'20%', md: "95%" }}
            w={{ base: "90%", md: "30%" }}
            bg="#E7F2E6"
            alignItems="center"
            p={4}
          >
            <Box w="100%" h="50%">
              <Image ml='3vw' w="70%" h="100%" src={focusImg}></Image>
            </Box>
            <Text  fontFamily="Nunito" fontWeight={600} fontSize={{base:'5vw',sm:"2vw"}}>
              Academic Focus
            </Text>
            <Text fontFamily="Nunito" fontWeight={400} mt="1vw">
              Engage in distraction-free conversations centered on academic
              subjects Immerse yourself in a study-centric environment for
              targeted learning and collaboration.
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid transparent"
            borderRadius="xl"
            h={{ base: "18rem",sm:'20%', md: "95%" }}
            w={{ base: "90%", md: "30%" }}
            bg="#E7F2E6"
            alignItems="center"
            p={4}
          >
            <Box  w="100%" h="50%">
            <Image ml='3vw' w="70%" h="100%" src={learningImg}></Image>
            </Box>
            <Text mt="1vw" fontFamily="Nunito" fontWeight={600} fontSize={{base:'5vw',sm:"2vw"}}>
              Efficient Learning hello checking
            </Text>
            <Text fontFamily="Nunito" fontWeight={400} mt="1vw">
              Save time on ChatClass with streamlined features for quick
              decision-making. Utilize its user-friendly interface,
              ensuring easy navigation and efficient access to study.
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid transparent"
            borderRadius="xl"
            h={{ base: "18rem",sm:'20%', md: "95%" }}
            w={{ base: "90%", md: "30%" }}
            bg="#E7F2E6"
            alignItems="center"
            p={4}
          >
            <Box  w="100%" h="50%">
              <Image ml='3vw' w="70%" h="100%" src={collaborativeImg}></Image>
            </Box>
            <Text mt="1vw" fontFamily="Nunito" fontWeight={600} fontSize={{base:'5vw',sm:"2vw"}}>
              Collaborative Spaces
            </Text>
            <Text fontFamily="Nunito" fontWeight={400} mt="1vw">
              Join subject-specific study groups to enhance understanding and
              collaboration. Connect with peers, share resources, and
              collectively tackle challenging concepts.
            </Text>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default WhyChatClass;
