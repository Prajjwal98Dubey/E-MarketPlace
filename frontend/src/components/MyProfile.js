import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import { handleAddToMyCart, handleRemoveFromMyCart, handleRemoveProductFromMyCart, totalAmountOfMyCart } from './helper/addToMyCart'
import { handleCheckout } from './helper/checkOutMethod'
import { conversionToStripeArray } from './helper/conversionToArrayofStripe'
const SHOW_PRODUCTS = 'http://localhost:5001/showOrders'
const REMOVE_PRODUCT = 'http://localhost:5001/removeProduct'
const MyProfile = () => {
  const [products, setProducts] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const[temp,setTemp]=useState(false)
  const[totalAmount,setTotalAmount]=useState(0)
  const navigate = useNavigate()
  const[isHoveredLogout,setIsHoveredLogout]=useState(false)
  useEffect(() => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`
      }
    }
    const currToken = JSON.parse(localStorage.getItem("userDetails")).token
    const getResults = async () => {
      const { data } = await axios.post(SHOW_PRODUCTS, {
        token: currToken
      }, config)
      setProducts(data.allProducts)
      setIsLoading(false)
    }
    getResults()
    totalAmountOfMyCart().then((res)=>setTotalAmount(res))
  }, [temp])
  const handleLogOut=()=>{
    localStorage.removeItem("userDetails")
    navigate('/')
  }
  return (
    <>
      <Header />
      
      {isloading ? 
      <div className="flex justify-center">Loading...</div> :
        <div className='relative mb-[100px]'>
          {console.log(conversionToStripeArray(products))}
          {products.map((prod) => (
            <div key={prod._id} className=' font-Roboto flex justify-evenly hover:border hover:border-purple-500 hover:cursor-pointer shadow-lg rounded-lg p-2 m-2'>
              <div  className='w-1/2'>
                <div className='flex'>
                  <div className='m-2'>
                    <img src={prod.product[0].image} alt="loading" className='w-[200px] h-[170px] rounded-lg ' />
                    <div className="flex justify-center m-1">
                      <button className='w-[50px] rounded-lg mr-1 bg-red-500 hover:bg-red-600 hover:cursor-pointer h-[30px] flex justify-center items-center' onClick={()=>handleRemoveProductFromMyCart(prod.productId,temp,setTemp)}><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></button>
                      <Link to={"/buy?pid=" + prod.productId}> <button onClick={() => {
                      }} className='w-[50px] rounded-lg bg-green-500 hover:bg-green-600 h-[30px] flex justify-center hover:cursor-pointer items-center'><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg></button></Link>
                    </div>
                  </div>
                  <div className='ml-4 flex items-center'>
                    <div>
                      <div className="text-xl font-bold w-[300px]">{prod.product[0].name}</div>
                      <div className=''>{prod.product[0].brand}</div>
                      <div>{prod.product[0].ratings}</div>
                    </div>
                  </div>
                </div>

              </div>
              <div className='w-1/3 h-[200px] flex justify-center items-center'>
                    <div className=' flex justify-center items-center'>
                        <div onClick={()=>handleRemoveFromMyCart(prod.productId,temp,setTemp)} className='w-[70px] flex justify-center rounded-l-lg border border-black hover:cursor-pointer hover:bg-gray-400'>-</div>
                        <div className='w-[70px] flex justify-center  border border-black'>
                          {prod.quantity}
                        </div>
                        <div onClick={()=>{
                          handleAddToMyCart(prod.product[0],temp,setTemp)
                          }}  className='w-[70px] flex justify-center rounded-r-lg border border-black hover:cursor-pointer hover:bg-gray-400'>+</div>
                    </div>
                </div>
                <div className='flex items-center w-[100px] mb-[25px] text-2xl font-bold'>₹ {prod.totalAmount}</div>
            </div>
          ))}

          <div className=' mt-[15px] font-Roboto flex justify-between items-center fixed bottom-0  w-full h-[70px] border border-t-black z-10 bg-white pl-[130px]'>


            <div className='cursor-pointer relative' onMouseEnter={()=>setIsHoveredLogout(true)} onMouseLeave={()=>setIsHoveredLogout(false)} onClick={()=>handleLogOut()}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out transform rotate-180"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg></div>
            {isHoveredLogout && <div className='absolute left-11 bottom-1 w-[90px] h-[30px] flex justify-center bg-gray-300 rounded-lg items-center '>Logout</div>}
            <div className='text-2xl hover:text-red-600 hover:underline hover:cursor-pointer p-2'>Clear Cart</div>
            <div onClick={()=>handleCheckout(conversionToStripeArray(products))}  className='hover:cursor-pointer p-2 flex justify-center items-center text-2xl w-[300px] h-[40px] rounded-lg hover:bg-orange-600 bg-[#fb641b]'>Place Order</div>
            
            <div className='w-[450px] text-3xl p-2 font-bold'>Subtotal: ₹{totalAmount}</div>
          </div>
        </div>
      }
    </>
  )
}

export default MyProfile