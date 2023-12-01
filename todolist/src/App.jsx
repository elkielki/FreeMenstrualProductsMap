import React, { useState, useEffect } from 'react';
import { ChakraProvider, Flex, Button, Box, Select, Text, IconButton, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuDivider } from '@chakra-ui/react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Axios from './axiosSetup';
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from './Dashboard';
import Home from './Home';
import Register from './components/Register';
import Login from './components/Login';
import { UserContextProvider } from './context/userContext';
// Doesn't work
import Protected from './Protected';

function App() {

  return (
      <Box> 
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Protected>
                <Dashboard />
              </Protected>}/>
          </Routes> 
      </Box>
  )
}
export default App
//        <UserContextProvider></UserContextProvider>