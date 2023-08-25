import React, { useEffect ,useState} from 'react'
import NavBar from './NavBar'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {
  const quantity=useSelector((store)=>store.cart.cartQuantity)  
  return (
       <>
       <div className='w-full flex justify-around sticky top-0 z-10 p-2 bg-white rounded-lg shadow-xl'>
         <Link to="/"><div className="text-3xl">Home</div></Link>
         <div><NavBar/></div>
         <div className='w-[250px] flex justify-between text-xl mt-2'>
          <Link to="/seller"><div className='mr-4 hover:underline hover:cursor-pointer'>Become a Seller</div></Link>
          <Link to="/cart"><div className=' hover:cursor-pointer flex w-[70px] hover:rounded-lg hover:bg-yellow-300 justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <div className=' ml-1 mb-4 text-sm w-[20px]'>{quantity}</div>
          </div></Link>
         </div>
         </div>
       </>
  )
}

export default Header