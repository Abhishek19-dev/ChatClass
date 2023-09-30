import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Text, useDisclosure } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isCentered size='lg' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h='410px'>
          <ModalHeader
            fontFamily="Work sans"
            fontSize="40px"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDir="column" alignItems="center" justifyContent="space-between">
            <Image
              borderRadius="full"
              boxSize="150px"
            //   src={user.avatar.url}
              alt={user.name}
            />
            <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Work sans">{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
