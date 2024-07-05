import React, { useState, useContext } from 'react';
import { Button } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Axios from '../axiosSetup';
import { UserContext } from '../context/userContext';
//import { useAuth } from '../context/AuthContext';

export default function Logout() {
 //   const {user, setUser} = useContext(UserContext);
 //   const {user, setUser} = useContext(UserContext);//useAuth();
    const navigate = useNavigate(); 
    const {user, setUser, loggedIn, setLogin} = useContext(UserContext);

    const logoutUser = async (e) => {
        Axios.get('/logout')
        .then(res => {
            setLogin(false);
            window.localStorage.removeItem("logged-in");  //was set before , JSON.stringify(false)
            window.localStorage.removeItem("todos");
            window.localStorage.removeItem("filter");
            window.localStorage.removeItem("categories");
            setUser(null);
            navigate('/');
        }).catch(err => console.log(err));  

// logged in vs refreshed
    /*    Axios.put('/logoutTodos', {
            id: user._id,
            todos: JSON.parse(window.localStorage.getItem("todos"))
        }).then(res => {
            console.log("Logout Todos: " + JSON.stringify(window.localStorage.getItem("todos")))
            Axios.get('/logout')
            .then(res => {
                setLogin(false);
                window.localStorage.setItem("logged-in", JSON.stringify(false));
                window.localStorage.removeItem("todos");
                setUser(null);
                navigate('/');
            }).catch(err => console.log(err));
        }).catch(err => console.log(err)); */
        
    }

    return (
        <Button onClick={logoutUser}>Logout</Button>
    )
}