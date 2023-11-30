import Axios from '../axiosSetup.jsx';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {
     const [user, setUser] = useState(null);
 /*    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }*/

 /*   useEffect(() => {
        if (!!user) {
          Axios.get('/profile')
          .then(({profileData}) => {
              setUser(profileData)
          })
        }
      }, [])   */
      useEffect(() => {
        if (!user) {
            Axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])  

    return (   //{user, setUser}
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}