import {
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import React from 'react'
import { UilCommentAltPlus } from '@iconscout/react-unicons'
import { UilEye } from '@iconscout/react-unicons'

const SearchUserProfile = ({search , handleFunction}) => {
    console.log("Searched",search)
  return (
    <Box display="flex" alignItems="center" bg='#F4F7FB'>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Avatar size="md" name= {search && search.name} src= {search.avatar.url}>
          <AvatarBadge boxSize="0.8em" bg="#2BB47D" />
        </Avatar>
        <Text ml={4} fontFamily="Public Sans" fontWeight={500}>
          {search.name}
        </Text>
      </Box>
      <Stack mr={3} direction="row" spacing={4} mt={1}>
        <Tooltip hasArrow label="Start Chat">
          <IconButton onClick={handleFunction} color="#7168EF">
            <UilCommentAltPlus />
          </IconButton>
        </Tooltip>
        <Tooltip hasArrow label="View Profile">
          <IconButton color="#7168EF">
            <UilEye />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  )
}

export default SearchUserProfile
