import React, { useState, useEffect } from 'react';
import { ChakraProvider, Flex, Button, Box, Select, Text, IconButton, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuDivider } from '@chakra-ui/react';
import {Routes, Route} from 'react-router-dom';
import Axios from './axiosSetup';
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from './Dashboard';
import Home from './Home';
import Register from './components/Register';
import Login from './components/Login';
import { UserContextProvider } from './context/userContext';
import Protected from './Protected';
//import { AuthProvider } from '../context/AuthContext';

function App() {
//  const [username, setUsername] = useState("");
 // const [user, setUser] = useState("");

  return (
      <Box> 
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={
            
              <Dashboard />
             
          }/>
        </Routes> 
      </Box>
  )
}
export default App
//        <UserContextProvider></UserContextProvider>