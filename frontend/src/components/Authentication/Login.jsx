import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'; 
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { loginUser } from '../../redux/actions/userAction';
import { useToast } from '@chakra-ui/react'
 
 
 const Login = () =>{
     const [show , setShow] = useState(false)
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const toast = useToast()
    // const isLoggedInRef = useRef(false)

    const handlePasswordShow = ()=>{
        setShow(!show)
    }
     const dispatch = useDispatch()
     const navigate = useNavigate()

     

    const submitLoginUpForm = ()=>{
        if(!email || !password){
            toast({
                title:"Please Fill All the fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
        }
        dispatch(loginUser(email,password))
    }
    const {loading , user , isLoggedIn} = useSelector((state)=> state.loginUser)

    useEffect(()=>{
        console.log("log",isLoggedIn)
        // if(isLoggedIn && !isLoggedInRef.current){
        if(isLoggedIn){
            // isLoggedInRef.current = true
            // isLoggedInRef.current = true
            navigate("/")
            toast({
                title:"Login Successfully",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
        }
      },[isLoggedIn])
return (

<>
         <VStack spacing='5px' color='black'>
            
            <FormControl id='email' isRequired>
             <FormLabel>Email</FormLabel>
                <Input mb='1rem' value={email} placeholder='Enter Your Email' onChange={(e)=> setEmail(e.target.value)}/>
            </FormControl>

            <FormControl id='password' isRequired>
             <FormLabel>Password</FormLabel>
             <InputGroup>
             <Input value={password} mb='1rem' type={show ? 'text':'password'} placeholder='Enter Your Password' onChange={(e)=> setPassword(e.target.value)}/>
             <InputRightElement width="4.5rem">
                <Button h = "1.75rem" size='sm' onClick={handlePasswordShow}>
                    {show ? "Hide" : "show"}
                </Button>
             </InputRightElement>
             </InputGroup>
            </FormControl>

            <Button colorScheme='blue'
             isLoading = {loading}
            width='100%'
            style={{marginTop:15}}
                onClick = {submitLoginUpForm}>
                    Login
            </Button>

            <Button colorScheme='red'
            width='100%'
            style={{marginTop:15}}
                onClick = {()=>{
                    setEmail("guest@example.com")
                    setPassword("123456")
                }}>
                 Get Guest User Credentials
            </Button>
            
         </VStack>
        </>

)
};
 
export default Login