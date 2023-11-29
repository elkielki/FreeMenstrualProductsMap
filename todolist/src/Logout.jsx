import {useState, useContext} from 'react';
import Axios from './axiosSetup';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext';
import { Button } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext';
export default function Logout() {
    const {user, setUser, isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate(); 
 //   const {user, setUser} = useContext(UserContext);

    const logoutUser = async (e) => {
        Axios.get('/logout')
        .then(res => {
            setIsLoggedIn(false);
            setUser(null);
            //    setUser({})
            navigate('/');
            console.log("In logout: " + user.email);
        }).catch(err => console.log(err));
    }

    return (
        <Button onClick={logoutUser}>Logout</Button>
    )
}