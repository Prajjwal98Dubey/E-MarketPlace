import axios from 'axios'
import React, { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router'

const Register = () => {
    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[message,setMessage]=useState(null)
    const navigate= useNavigate()
    const submitHandler=async(e)=>{
        e.preventDefault()
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:5001/register',{
            name,email,password
        },config)
        if(data==="User already exists")
        {
            setMessage("User already exists")
            setTimeout(()=>{
                    navigate('/')
            },2000)
        }
        else{
           localStorage.setItem("userInfo",JSON.stringify(data))
           navigate('/')
        }
    }
  return (
    <>
    <div className='flex justify-center'>
     <div className='flex justify-center m-10 w-[1000px]  h-[500px]  border border-gray-500 rounded-lg shadow-lg'>
        <form onSubmit={submitHandler}>
            <div className='mt-[120px]'>
                <div>
                    <div>
                        <input className='w-[340px] p-2 m-2 border border-gray-300 h-[40px] text-md rounded-lg shadow-lg'  type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Enter your name"/>
                    </div>
                    <div>
                        <input className='w-[340px] p-2 m-2 border border-gray-300 h-[40px] text-md rounded-lg shadow-lg'  type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div>
                        <input className='w-[340px] p-2 m-2 border border-gray-300 h-[40px] text-md rounded-lg shadow-lg' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
                    </div>
                    <div className='flex justify-center'>
                         <button className=' bg-blue-600 w-[150px] h-[30px] text-white rounded-lg shadow-lg hover:bg-blue-700' type="submit">Submit</button>
                    </div>
                    <div>
            {message ? <div className='text-xl font-bold text-red-600 flex justify-center m-2 p-2'>{message}</div>:null}</div>
                </div>
            </div>
        </form>
     </div>
     </div>
    </>
  )
}

export default Register