import React, { useState, useContext } from 'react';
import { Button } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Axios from '../axiosSetup';
import { UserContext } from '../context/userContext';
//import { useAuth } from '../context/AuthContext';

export default function Logout() {
 //   const {user, setUser} = useContext(UserContext);
    const {user, setUser} = useContext(UserContext);//useAuth();
    const navigate = useNavigate(); 

    const logoutUser = async (e) => {
        Axios.get('/logout')
        .then(res => {
         //   setIsLoggedIn(false);
            //    setUser({})
            setUser(null);
            navigate('/');
            console.log("In logout: " + user.email);
        }).catch(err => console.log(err));
    }

    return (
        <Button onClick={logoutUser}>Logout</Button>
    )
}