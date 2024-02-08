import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'; 
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { allUsers, loginUser } from '../../redux/actions/userAction';
import { useToast } from '@chakra-ui/react'
 
 
 const Login = () =>{
     const [show , setShow] = useState(false)
    const [name , setName] = useState("")
    const [password , setPassword] = useState("")
    const toast = useToast()
    // const isLoggedInRef = useRef(false)


    const handlePasswordShow = ()=>{
        setShow(!show)
    }
     const dispatch = useDispatch()
     const navigate = useNavigate()

     useEffect(()=>{
        dispatch(allUsers())
     },[])

     const {users} = useSelector((state)=> state.getAllUsers)

    const submitLoginUpForm = ()=>{
        if(!name || !password){
            toast({
                title:"Please Fill All the fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
        }
        const exist = users.filter((user)=> user.name === name)
        
        if(exist.length > 0){
            dispatch(loginUser(name,password))
        }
        else{
            toast({
                title:"User is not registered !",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
        }
    }
    const {loading , user , isLoggedIn} = useSelector((state)=> state.loginUser)

    useEffect(()=>{
        console.log("log",isLoggedIn)
        // if(isLoggedIn && !isLoggedInRef.current){
        if(isLoggedIn){
            // isLoggedInRef.current = true
            // isLoggedInRef.current = true
            localStorage.setItem('user', JSON.stringify({ isLoggedIn: true }));
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
            
            <FormControl id='text' isRequired>
             <FormLabel>Username</FormLabel>
                <Input mb='1rem' value={name} placeholder='Enter Your Username' onChange={(e)=> setName(e.target.value)}/>
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

            
         </VStack>
        </>

)
};
 
export default Login