import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
function Login() {

    const { isAuthenticated, setIsAuthenticated , loading , setLoading} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async(e)=>{
        e.preventDefault();
        setLoading(true)
       try {
        const {data}=await axios.post(`${server}/users/login`,{
          email,password
        },{
          header:{
            "Content-type":"application/json"
          },
          withCredentials:true,
        })
    
        toast.success(data.message)
        setIsAuthenticated(true)
        setLoading(false)
       } catch (error) {
        toast.error(error.response.data.message)
        setLoading(false)
        setIsAuthenticated(false)
        // console.log(error)
        
       }
    }

    if (isAuthenticated) return <Navigate to={"/"} />
    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button disabled={loading} type="submit">Log In</button>
                    <h4>Or</h4>
                    <Link to="/register">SignUp</Link>
                </form>
            </section>
        </div>
    )
}

export default Login