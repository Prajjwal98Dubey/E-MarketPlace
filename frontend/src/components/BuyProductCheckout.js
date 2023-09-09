import React from 'react'
import axios from 'axios'
const BuyProductCheckout = ({item}) => {
    const handleCheckOut=()=>{
        const items= [item]
        axios.post('http://localhost:5001/create-checkout-session',{
            items
        }).then((res)=>{
            if(res.data.url){
                window.location.href=res.data.url
            }
        }).catch((err)=>console.log(err.message))
        
    }
  return (
    <>
    <div><button className='w-[200px] h-[50px] rounded-lg bg-green-500 hover:bg-green-600 text-white mt-2' onClick={()=>handleCheckOut()}>Pay ₹{item.price*item.quantity}</button></div> 
    </>
  )
}

export default BuyProductCheckout