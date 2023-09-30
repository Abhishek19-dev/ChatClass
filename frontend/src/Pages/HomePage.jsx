 import { Button } from '@chakra-ui/react';
import React from 'react'; 
import { Link } from 'react-router-dom';
 
 const HomePage = () =>{
    
return <div><Link to = "/chats"><Button>Chats</Button></Link></div>
};
 
export default HomePage