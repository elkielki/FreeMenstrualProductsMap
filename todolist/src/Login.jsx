import {useState} from 'react';
import Axios from './axiosSetup';
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const {user, setUser, isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate(); 
    const [data, setData] = useState({
        email: '',
        password: '',
    //    todos: [], 
    ///    filter: false,
   //     categories: ['Uncategorized']
    })

    const loginUser = async (e) => {
        e.preventDefault();
        const {email, password, todos, filter, categories} = data
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
                setIsLoggedIn(true);
                Axios.get('/profile')
                .then(({profileData}) => {
                    setUser(profileData)
                })
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