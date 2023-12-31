import {Link} from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
const COPY_FROM_CART_TO_USER = 'http://localhost:5001/copyFromCartToUser'
const Login = () => {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[message,setMessage]=useState(null)
    const navigate=useNavigate()
    const items = useSelector(store=>store.cart.items)
    const submitHandler=async(e)=>{
        e.preventDefault()
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post('http://localhost:5001/login',{
            email,password
        },config)
          if(data==='User does not exits'){
               setMessage("User does not exists")
          }
          else if(data==='Invalid email or password')
          {
            setMessage("Invalid email or password")
          }
          else{
                localStorage.setItem('userDetails',JSON.stringify(data))
                const config1 = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`
                    }
                }
                  const currToken= JSON.parse(localStorage.getItem("userDetails")).token
                  const addCartToUser = async(productId,Quantity)=>{
                      await axios.post(COPY_FROM_CART_TO_USER,{
                        token:currToken,
                        productId:productId,
                        Quantity:Quantity
                      },config1)
                  }
                  localStorage.getItem("userDetails") && items.length!==0 && items.map((item)=>(
                            addCartToUser(item._id,item.Quantity)
                  ))

                  navigate('/')
          }

    }
  return (
    <div className='flex justify-center animate-fade'>
     <div className='flex justify-center m-10 w-[1000px]  h-[500px]  border border-gray-500 rounded-lg shadow-lg'>
        <form onSubmit={submitHandler}>
            <div className='mt-[120px]'>
                <div>
                    <div className='text-xl flex justify-center font-semibold '>Login</div>
                    <div>
                        <input className='w-[450px] p-2 m-2 border border-gray-300 h-[40px] text-md rounded-lg shadow-lg'  type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div>
                        <input className='w-[450px] p-2 m-2 border border-gray-300 h-[40px] text-md rounded-lg shadow-lg' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
                    </div>
                    <div className='flex justify-center'>
                         <button className=' bg-blue-600 w-[150px] h-[30px] text-white rounded-lg shadow-lg hover:bg-blue-700' type="submit">Login</button>
                    </div>
                    <div className='text-sm  mt-2  flex justify-center'>
                        New User<Link to='/register'><span className='text-blue-700 ml-1 hover:text-blue-800 hover:underline cursor-pointer'>Register here</span></Link>
                    </div>
                    <div>
            {message ? <div className='text-xl font-bold text-red-600 flex justify-center m-2 p-2'>{message}</div>:null}</div>
                </div>
            </div>
        </form>
     </div>
     </div>
  )
}

export default Login