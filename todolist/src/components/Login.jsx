import React, { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Axios from '../axiosSetup';
//import { useAuth } from '../context/AuthContext';
import { UserContext } from '../context/userContext';

export default function Login() {
//    const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(UserContext);//useAuth();
    const navigate = useNavigate(); 
    const [data, setData] = useState({
        email: '',
        password: '',
    //    todos: [], 
    ///    filter: false,
   //     categories: ['Uncategorized']
    })

    const loginUser = async (e) => {
        e.preventDefault(); // , todos, filter, categories
        const {email, password} = data
        try {
            const {data} = await Axios.post('/login', {
                email: email,
                password: password,
            //    todos: todos,
            //    filter: filter,
            //    categories: categories
            });
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({
                    email: '',
                    password: '',
                //    todos: [], 
               //     filter: false,
                //    categories: ['Uncategorized']
                });
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
                <label>Password</label>
                <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}