import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
const REGISTER_USER = 'http://localhost:5001/register'
const Register = () => {
    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate= useNavigate()

    const registerUser=async()=>{
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(REGISTER_USER,{
            name,email,password
        },config)
        if (data==="User already exists"){
            toast.error("User already exists",{
                position:'top-center'
            })
            // navigate('/login')
        }
        else{
            localStorage.setItem("userDetails",JSON.stringify({token:data.token,email:data.email}))
            navigate('/')
        }
    }
    
  return (
    <>
    <div className='flex justify-center'>
     <div className='flex justify-center m-10 w-[1000px]  h-[500px]  border border-gray-500 rounded-lg shadow-lg'>
     
        <div>
            <div className='mt-[120px]'>
                <div>
                <div className='flex justify-center text-xl font-semibold m-2'>Register with us </div>
                    <div>
                        <input className='w-[450px] p-2 m-2 border border-gray-300 h-[40px] text-md rounded-lg shadow-lg'  type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Enter your name"/>
                    </div>
                    <div>
                        <input className='w-[450px] p-2 m-2 border border-gray-300 h-[40px] text-md rounded-lg shadow-lg'  type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div>
                        <input className='w-[450px] p-2 m-2 border border-gray-300 h-[40px] text-md rounded-lg shadow-lg' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
                    </div>
                    <div className='flex justify-center'>
                         <button className=' bg-blue-600 w-[150px] h-[30px] text-white rounded-lg shadow-lg hover:bg-blue-700' type="submit" onClick={()=>registerUser()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
     </div>
     </div>
    </>
  )
}

export default Register