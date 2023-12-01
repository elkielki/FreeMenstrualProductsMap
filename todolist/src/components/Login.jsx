import React, { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Axios from '../axiosSetup';
import { UserContext } from '../context/userContext';

export default function Login() {
    const navigate = useNavigate(); 
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const {user, setUser, loggedIn, setLogin} = useContext(UserContext);

    const loginUser = async (e) => {
        e.preventDefault(); 
        const {email, password} = data
        try {
            const {data} = await Axios.post('/login', {
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({
                    email: '',
                    password: '',
                });
                setLogin(true);
                window.localStorage.setItem("logged-in", JSON.stringify(true));
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
 /*   




const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {user, setUser, loggedIn, setLogin} = useContext(UserContext);

    const loginUser = (e) => {
        e.preventDefault();
        Axios.post('/login', {email, password})
        .then(res => {
            if (res.data.Status === "Success") {
                setLogin(true);
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        }).catch(err => console.log(err)) 
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input type='email' placeholder='enter email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type='password' placeholder='enter password...' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
*/