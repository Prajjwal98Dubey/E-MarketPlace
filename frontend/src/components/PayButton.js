import React from 'react'
import axios from 'axios'
import { handleCheckout } from './helper/checkOutMethod'
const PayButton = ({items}) => {
  return (
    <>
    <div><button className='w-[300px] h-[40px] rounded-lg hover:bg-orange-600 bg-[#fb641b]' onClick={()=>handleCheckout(items)}>Place Order</button></div>
    </>
  )
}

export default PayButton