 import React, { useEffect, useState } from 'react'; 
 import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
 
 const SignUp = () =>{
    const [show , setShow] = useState(false)
    const [showConfirm , setShowConfirm] = useState(false)
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const [password , setPassword] = useState("")
    const [avatar , setAvatar] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
 
    const handlePasswordShow = ()=>{
        setShow(!show)
    }
    const handleConfirmPasswordShow = ()=>{
        setShowConfirm(!showConfirm)
    }

   const handleAvatarUpload = (e) =>{
    const selectedAvatar = e.target.files[0]
    const file = selectedAvatar
    const reader = new FileReader()
    reader.onload = (e)=>{
        const arrayBuffer = e.target.result
        const uint8Array = new Uint8Array(arrayBuffer)
    
    const selectedFiles = {
        file:{
            name : file.name,
            type : file.type,
            size : file.size
        },
      buffer : uint8Array,
    }
    setAvatar(selectedFiles)
      }
      reader.readAsArrayBuffer(file)
   }

    const submitSignUpForm = async(e)=>{
         e.preventDefault()

         const convertedPic = {
            fieldname: 'file',
          originalname: avatar.file.name,
          encoding: '7bit',
          mimetype: avatar.file.type,
          buffer: avatar.buffer,
          size: avatar.file.size,
         }

         const formData = new FormData();

         formData.append("name",name)
         formData.append("email",email)
         formData.append("password",password)
         formData.append("confirmPassword",confirmPassword)
         formData.append('file', new Blob([avatar.buffer]), avatar.file.name);
         
         console.log("name",name)
         console.log("email",email)
         console.log("password",password)
         console.log("confirmPassword",confirmPassword)
         console.log("avatar",avatar)
         
       dispatch(registerUser(formData))
    
    }


    const {user,isRegistered} = useSelector((state)=> state.registerUser)

    useEffect(()=>{
        if(isRegistered){
            navigate("/login")
        }
    },[isRegistered,navigate])
   

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
                <Input mb='1rem' type='file' p={1.5} accept='image/*' placeholder='Enter Your Email' onChange= {handleAvatarUpload}/>
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