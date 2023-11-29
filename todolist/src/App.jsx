import { useState, useEffect } from 'react'
import Axios from './axiosSetup';
import Home from './Home'
import './App.css'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { ChakraProvider, Flex, Button, Box, Select, Text, IconButton, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuDivider } from '@chakra-ui/react'
import jwt_decode from "jwt-decode";
import {Routes, Route} from 'react-router-dom'
import NavBar from './Navbar';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import toast, { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Protected from './Protected';
import { AuthProvider } from '../context/AuthContext';

function App() {
//  const [username, setUsername] = useState("");
 // const [user, setUser] = useState("");

  return (
    <AuthProvider>
      <Box> 
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={
            <Protected> 
              <Dashboard />
            </Protected>
          }/>
        </Routes> 
      </Box>
    </AuthProvider>
    
    
  )
}


/*                        
      
      <Button onClick={handleLogout}>Logout</Button>
      <Home />



<GoogleLogin
        onSuccess={(credResponse) => handleLogin(credResponse)}
        onError={() => {
          console.log('Login Failed');
        }}
        ux_mode='redirect'
      />


<div className="App">
      <div id="signInDiv"></div>
    </div>
   
    */
export default App
