import React, { useState, useEffect } from 'react';
import { ChakraProvider, Flex, Button, Box, Select, Text, IconButton, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuDivider } from '@chakra-ui/react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Axios from './axiosSetup';
import toast, { Toaster } from 'react-hot-toast';
import Home from './Home';
import Register from './components/Register';
import Login from './components/Login';
import { UserContextProvider } from './context/userContext';
import './theme/App.css';
//import theme from './theme/Theme';
import MapView from './components/MapView';
// Doesn't work
import Protected from './Protected';

function App() {
  
 // document.body.style.backgroundColor = '#253237';
// theme={theme} 
  return (
    <ChakraProvider >
      <Box> 
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes> 
      </Box>
    </ChakraProvider>
  )
}
export default App
//        <UserContextProvider></UserContextProvider>

//            <Route path='/dashboard' element={<Protected>
//<Home />
//</Protected>}/>