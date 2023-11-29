import Axios from '../src/axiosSetup.jsx';
import { createContext, useState, useEffect, useReducer } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {
     const [user, setUser] = useState(null);
/*    const [user, setUser] = useReducer(userReducer, {
        user: null
    }) */

/*    useEffect(() => {
        if (!user) {
            Axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])  */
    return (   //{user, setUser}
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}