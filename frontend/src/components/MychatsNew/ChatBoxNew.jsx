import {
  Avatar,
  Box,
  Center,
  Divider,
  IconButton,
  Input,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import React from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilEye } from '@iconscout/react-unicons'

const ChatBoxNew = () => {
  const [isEditing, setIsEditing] = useBoolean()
  return (
    <>
      <Box w="114vh" display="flex" flexDirection="column" ml="50vh">
        <Box
          w="full"
          display="flex"
          mt="5vh"
          ml="3vh"
          mb={6}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            w="fit-content"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Avatar
              mr={3}
              size="md"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            ></Avatar>{' '}
            <Text
              mr={3}
              fontFamily="Public Sans"
              fontSize="1rem"
              fontWeight={600}
              textColor="black"
            >
              Parth Behl
            </Text>
            <Box
              w="10px"
              h="10px"
              bg="green.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box w="2px" h="2px" bg="white" borderRadius="full" />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Popover
              isOpen={isEditing}
              onOpen={setIsEditing.on}
              onClose={setIsEditing.off}
              closeOnBlur={false}
              isLazy
              lazyBehavior="keepMounted"
            >
              <PopoverTrigger>
                <IconButton mr={6}>
                  <UilSearch />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent mr={5}>
                <PopoverBody>
                  <Input placeholder="Search your Chat" size="md" />
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <IconButton color="#74788D" bg="transparent" mr={10}>
              <UilEye />
            </IconButton>
          </Box>
        </Box>
        <Divider w="full" />

        {/* CHAT BOX  */}
        <Box mt={6} ml={6}>
          <Box display="flex" flexDirection="column">
            <Box w="fit-content" display="flex" flexDirection="column">
              <Box
                m="auto"
                ml={10}
                borderRadius="lg"
                p={3}
                bg="#7168EF"
                h="fit-content"
                textColor="white"
                position='relative'
              >
                <Box zIndex='-1' position='absolute' right='3.75rem' top='1.7rem' w={10} h={10}  bg="#7168EF" clipPath="polygon(0 0, 100% 0, 100% 30%, 0 100%)" />
                <Text mt={3}>jdskgajdsk</Text>
              </Box>
              <Box mb={3} />
            </Box>
            <Box w="fit-content" display="flex" flexDirection="column">
              <Box
                m="auto"
                ml={10}
                borderRadius="lg"
                p={3}
                bg="#7168EF"
                h="fit-content"
                textColor="white"
                position='relative'
              >
                <Box zIndex='-1' position='absolute' right='3.75rem' top='1.7rem' w={10} h={10}  bg="#7168EF" clipPath="polygon(0 0, 100% 0, 100% 30%, 0 100%)" />
                <Text mt={3}>jdskgajdsk</Text>
              </Box>
              <Box display="flex">
                <Avatar
                  size="sm"
                  name="Kent Dodds"
                  src="https://bit.ly/kent-c-dodds"
                />
                <Text fontFamily='Public Sans' fontWeight={400} mt={1.5} ml={3}>
                  Abhishek
                </Text>
              </Box>
            </Box>
          </Box>

          
        </Box>
      </Box>
    </>
  )
}

export default ChatBoxNew
