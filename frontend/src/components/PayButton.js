import React from 'react'
import { handleCheckout } from './helper/checkOutMethod'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
const PayButton = ({items}) => {
  const navigate = useNavigate()
  return (
    <>
    <div><button className='w-[300px] h-[40px] rounded-lg hover:bg-orange-600 bg-[#fb641b]' onClick={()=>{
      if (!localStorage.getItem("userDetails")){
        toast.warning("Login to place order",{
          position:"top-center"
        })
        navigate('/login')
        return
      }
      handleCheckout(items)}}>Place Order</button></div>
    </>
  )
}

export default PayButton