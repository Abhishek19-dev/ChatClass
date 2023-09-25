import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import './App.css';

import ChatPage from './Pages/ChatPage';
import LoginSignUp from './Pages/LoginSignUp';



function App() {
  return (
    <div className='App'>

   <Routes>
    <Route path = "/login" element = {<LoginSignUp />} />
    <Route path = "/chats" element = {<ChatPage />} />
   </Routes>

   </div>
  );
}

export default App;
