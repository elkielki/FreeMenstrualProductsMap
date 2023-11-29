import { useNavigate } from "react-router-dom";
import React, {useContext, useEffect} from 'react';
//import { UserContext } from '../context/userContext';
import { useAuth } from '../context/AuthContext';

const Protected = ({ children }) => {
//  const {user} = useContext(UserContext);
  const {user, setUser, isLoggedIn, setIsLoggedIn} = useAuth();
  const navigate = useNavigate();

  if ((user === null) || (user == {})) {
    console.log("User  in Protected Null: " + user);
    return navigate('/');
  }
  else {
    console.log("User  in Protected: " + user.email);
    return children;
  }

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