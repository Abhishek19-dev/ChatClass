 import React, { useState } from 'react'; 
 import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
 
 const SignUp = () =>{
    const [show , setShow] = useState(false)
    const [showConfirm , setShowConfirm] = useState(false)
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const [password , setPassword] = useState("")
    const [pic , setPic] = useState("")
 
    const handlePasswordShow = ()=>{
        setShow(!show)
    }
    const handleConfirmPasswordShow = ()=>{
        setShowConfirm(!showConfirm)
    }

    const postDetails = (pics) =>{

    }

    const submitSignUpForm = ()=>{

    }

    return (
        <>
         <VStack spacing='6px' color='black'>
            <FormControl id='first-name' isRequired>
             <FormLabel>Name</FormLabel>
                <Input mb='1rem' placeholder='Enter Your Name' onChange={(e)=> setName(e.target.value)}/>
            </FormControl>

            <FormControl id='email' isRequired>
             <FormLabel>Email</FormLabel>
                <Input mb='1rem' placeholder='Enter Your Email' onChange={(e)=> setEmail(e.target.value)}/>
            </FormControl>

            <FormControl id='password' isRequired>
             <FormLabel>Password</FormLabel>
             <InputGroup mb='2px'>
             <Input mb='1rem' type={show ? 'text':'password'} placeholder='Enter Your Password' onChange={(e)=> setPassword(e.target.value)}/>
             <InputRightElement width="4.5rem">
                <Button h = "1.75rem" size='sm' onClick={handlePasswordShow}>
                    {show ? "Hide" : "show"}
                </Button>
             </InputRightElement>
             </InputGroup>
            </FormControl>

            <FormControl id='confirm-password' isRequired>
             <FormLabel>Confirm Password</FormLabel>
             <InputGroup>
             <Input mb='1rem' type={showConfirm ? 'text':'password'} placeholder='Enter Your Confirm Password' onChange={(e)=> setConfirmPassword(e.target.value)}/>
             <InputRightElement width="4.5rem">
                <Button h = "1.75rem" size='sm' onClick={handleConfirmPasswordShow}>
                    {showConfirm ? "Hide" : "show"}
                </Button>
             </InputRightElement>
             </InputGroup>
            </FormControl>

            <FormControl id='pic' isRequired>
             <FormLabel>Upload Your Picture</FormLabel>
                <Input mb='1rem' type='file' p={1.5} accept='image/*' placeholder='Enter Your Email' onChange={(e)=> postDetails(e.target.files[0])}/>
            </FormControl>

            <Button colorScheme='blue'
            width='100%'
            style={{marginTop:15}}
                onClick = {submitSignUpForm}>
                    Sign Up
            </Button>
         </VStack>
        </>
    )
};
 
export default SignUp