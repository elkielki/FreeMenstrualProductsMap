/*import React, { useState, useEffect, useContext  } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }

    useEffect(() => {
      if (isLoggedIn) {
        Axios.get('/profile')
        .then(({profileData}) => {
            setUser(profileData)
        })
      }
    }, [isLoggedIn])

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
*/