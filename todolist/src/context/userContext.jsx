import Axios from '../axiosSetup.jsx';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(() => {
        const logValue = window.localStorage.getItem("logged-in");
        return logValue !== null
          ? JSON.parse(logValue)
          : false;
      });
    
    
    
    //useState(false);

    const setLogin = (val) => {
    //    setLoggedIn(val);
        window.localStorage.setItem("logged-in", JSON.stringify(val));
        setLoggedIn(val);
        console.log(val);
    };

 /*   useEffect(() => {
        if (!!user) {
          Axios.get('/profile')
          .then(({profileData}) => {
              setUser(profileData)
          })
        }
      }, [])   */
    // original before context bug
    /*
    useEffect(() => {
        if (!user) {
            Axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])  
    */

    useEffect(() => {
        Axios.get('/profile').then(({data}) => {
            setUser(data)
        })
    }, [loggedIn])  

    return (   //{user, setUser}
        <UserContext.Provider value={{user, setUser, loggedIn, setLogin}}>
            {children}
        </UserContext.Provider>
    )
}