import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import './App.css';
import LoginSignUp from './Pages/LoginSignUp';
import HomePage from './Pages/HomePage';
import ChatPageNew from './Pages/ChatPageNew';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MyChatsTabs from './components/MychatsNew/SideBarTabs/MyChatsTabs';



function App() {

  const [selectedChat, setSelectedChat] = useState('')
    const {user} = useSelector((state)=> state.loginUser)

    const [myTabs , setMyTabs] = useState(<MyChatsTabs selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} />)


  return (
    <div className='App'>

   <Routes>
   <Route path = "/" element = {<HomePage myTabs = {myTabs} setMyTabs={setMyTabs} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />} />
    <Route path = "/login" element = {<LoginSignUp />} />
    <Route path = "/chats" element = {<ChatPageNew myTabs = {myTabs} setMyTabs={setMyTabs} selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>} />
   </Routes>

   </div>
  );
}

export default App;
