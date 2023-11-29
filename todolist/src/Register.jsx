import {useState, useRef} from 'react'
import { useToast } from '@chakra-ui/react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import Axios from './axiosSetup';

export default function Register() {
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    // need to edit the base data to include the other stuff like filter, categories, etc
    const registerUser = async (e) => {
        e.preventDefault()
        const {email, password} = data
        try {
            const {data} = await Axios.post('/register', {
                email, password
            })
            if (data.error) {
                toast.error(data.error)
                //toastIdRef.current = toast({ description: data.error, status: 'error'})
            } else {
                setData({})
                toast.success('Login Successful. Welcome!')
                //toastIdRef.current = toast({ description: 'Login Successful. Welcome!', status: 'success'})
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <div>
            <form onSubmit={registerUser}>
                <label>Email</label>
                <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
                <label>Password</label>
                <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}