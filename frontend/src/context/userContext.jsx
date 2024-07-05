import Axios from '../axiosSetup.jsx';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})
/*
export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(() => {
        const logValue = window.localStorage.getItem("logged-in");
        return logValue !== null
          ? JSON.parse(logValue)
          : false;
      });

    const setLogin = (val) => {
    //    setLoggedIn(val);
        window.localStorage.setItem("logged-in", JSON.stringify(val));
        setLoggedIn(val);
    //    console.log(val);
    };

    useEffect(() => {
        if (loggedIn) {
            Axios.get('/profile').then(({data}) => {
                console.log("UserContext: " + JSON.stringify(data.todos));
                console.log("UserContext loggedIn: " + loggedIn);
                setUser(data)
            })
        }
    }, [loggedIn])  

    return (   //{user, setUser}
        <UserContext.Provider value={{user, setUser, loggedIn, setLogin}}>
            {children}
        </UserContext.Provider>
    )  
} */

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(() => {
        const logValue = window.localStorage.getItem("logged-in");
        return logValue !== null
          ? JSON.parse(logValue)
          : false;
      });

    const [stationList, setStationList] = useState([]);
    const setLogin = (val) => {
        window.localStorage.setItem("logged-in", JSON.stringify(val));
        setLoggedIn(val);
    };

    useEffect(() => {
        if (loggedIn) {
            Axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [loggedIn]) 
    
    useEffect(() => {
        Axios.get('/getStations')  
        .then(function (response) {
            setStationList(response.data);  
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    return (   //{user, setUser}
        <UserContext.Provider value={{user, setUser, loggedIn, setLogin, stationList, setStationList}}>
            {children}
        </UserContext.Provider>
    )
}