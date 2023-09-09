import React from 'react'
import axios from 'axios'
const PayButton = ({items}) => {
    const handleCheckout=()=>{
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
    <div><button className='w-[300px] h-[40px] rounded-lg hover:bg-orange-600 bg-[#fb641b]' onClick={()=>handleCheckout()}>Place Order</button></div>
    </>
  )
}

export default PayButton