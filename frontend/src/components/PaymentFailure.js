

import React from 'react'
import {Link} from 'react-router-dom'
const PaymentFailure = () => {
  return (
    <>
     <div className='flex justify-center mt-[200px] font-mono'>
        <div>
          <div className='ml-[103px]'><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e61414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
        <div className=' font-bold mt-8 text-3xl'>Payment Failed...</div>
        <Link to='/'><div className=' mt-[20px] text-xl flex justify-center hover:underline hover:cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>Continue Shopping</div></Link>
      </div>
      </div>
    </>
  )
}

export default PaymentFailure