import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import './App.css';

import ChatPage from './Pages/ChatPage';
import LoginSignUp from './Pages/LoginSignUp';
import HomePage from './Pages/HomePage';



function App() {
  return (
    <div className='App'>

   <Routes>
   <Route path = "/" element = {<HomePage />} />
    <Route path = "/login" element = {<LoginSignUp />} />
    <Route path = "/chats" element = {<ChatPage />} />
   </Routes>

   </div>
  );
}

export default App;
