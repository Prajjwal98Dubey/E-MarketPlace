import React from 'react'
import { handleCheckout } from './helper/checkOutMethod'
const BuyProductCheckout = ({item}) => {
  return (
    <>
    <div><button className='w-[200px] h-[50px] rounded-lg bg-green-500 hover:bg-green-600 text-white mt-2' onClick={()=>handleCheckout(Array.of(item))}>Pay ₹{item.price*item.quantity}</button></div> 
    </>
  )
}

export default BuyProductCheckout