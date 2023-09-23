import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
const Header = () => {
  const quantity = useSelector((store) => store.cart.cartQuantity)
  const decoded = localStorage.getItem("userInfo") ? jwt_decode(localStorage.getItem("userInfo")) : null
  const [dropdown, setDropDown] = useState(false)

  return (
    <>
      <div className='w-full flex justify-around sticky top-0 z-10 p-2 bg-white rounded-lg shadow-xl'>
        <Link to="/"><div className="text-3xl">Home</div></Link>
        <div><NavBar /></div>
        <div>{localStorage.getItem('userInfo') ?
          <div>
            <div onClick={() => setDropDown(true)} className='text-blue-600 font-semibold mt-2 cursor-pointer'>
              {decoded.email}
            </div>
            {dropdown ?
              <div >
                <div className='absolute rounded-lg cursor-default border border-gray-400 bg-white w-[120px] h-[50px]flex justify-center '><button className='w-[100px] h-[30px] flex justify-center m-2 rounded-lg bg-orange-600 text-white' onClick={() => {
                  localStorage.removeItem('userInfo')
                  setDropDown(false)
                }}>Logout</button></div></div> : null}
          </div>

          : <Link to='/login'><div><button className='w-[135px] rounded-lg shadow-lg hover:bg-blue-800 h-[35px] text-white bg-blue-600 p-1 m-1'>Login</button></div></Link>}</div>

        <div className='w-[250px] flex justify-between text-xl mt-2'>
          <Link to="/seller"><div className='mr-4 hover:underline hover:cursor-pointer'>Become a Seller</div></Link>
          <Link to="/cart"><div className=' hover:cursor-pointer flex w-[70px] hover:rounded-lg hover:bg-yellow-300 justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
            <div className=' ml-1 mb-4 text-sm w-[20px]'>{quantity}</div>
          </div></Link>
        </div>
      </div>
    </>
  )
}

export default Header