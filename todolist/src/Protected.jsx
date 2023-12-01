import { useNavigate } from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from './context/userContext';

const Protected = ({children}) => {
  const {user, setUser, loggedIn, setLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();
//
  if (window.localStorage.getItem("logged-in") === 'false') {
    console.log("Hello Window Local Storage!");
    navigate('/');
  } else {
  //  console.log("Protected children: " + loggedIn);
    return children;
  }


  /*
  if (!loggedIn) {
    console.log("Protected // loggedIn value: " + loggedIn);
    return navigate('/');
  } else {
    console.log("Protected children: " + loggedIn);
    return children;
  }
 // if ((user === null) || (user == {})) {
/*  if (loggedIn) {
    return children;
  }  */

}; 

//import { Navigate } from 'react-router-dom';
/*import useAuth from '../context/useAuth';

const Protected = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return navigate('/login');
  }
  return <>{children}</>;
};  */

export default Protected;