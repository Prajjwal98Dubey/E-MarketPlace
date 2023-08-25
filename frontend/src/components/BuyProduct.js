
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from './Header'
import CartProducts from './CartProducts'
import { useDispatch, useSelector } from 'react-redux'
import { addToBuyPage, decrementProduct, incrementProduct, removeProduct } from './productSlice'

const BuyProduct = () => {
    const item = useSelector(store => store.product.item)
    const dispatch=useDispatch()
    
      const handleIncrementProduct=(item)=>{
               dispatch(incrementProduct(item))
      }
      const handleDecrementProduct=(item)=>{
        dispatch(decrementProduct(item))
        
      }
      const handleRemoveProduct=(item)=>{
        dispatch(removeProduct(item))
        
      }
    
    return (
        <>
            <Header />
            <div className='w-full bg-blue-500 h-[50px] rounded-lg '>
                <div className='flex justify-center mt-4 pt-3 '>
                <div className='text-lg ' >Order Summary</div></div></div>
                <div>
                <div className='flex justify-center mt-10'>
           <div>
                <img src={item.image} alt="loading" className='w-[400px] h-[300px] rounded-lg ' />
                <div className='flex justify-center mt-2'>
                    <div><button disabled={item.quantity===1} className='m-1 font-semibold flex justify-center items-center  border border-gray-700 w-[28px] h-[28px] rounded-full hover:cursor-pointer disabled:cursor-not-allowed'  onClick={()=>handleDecrementProduct(item)}>-</button></div>
                    <div className='m-1 w-[40px] h-[25px] border border-black flex justify-center items-center'>{item.quantity}</div>
                    <div ><button className='m-1 font-semibold flex justify-center hover:cursor-pointer items-center border border-gray-700 w-[28px] h-[28px] rounded-full' onClick={()=>handleIncrementProduct(item)} >+</button></div>
                </div>
             </div>
             <div className='p-4 mt-8'>
                <div>
                <div className='m-2 font-semibold'>{item.name}</div>
                <div className='m-2 '>{item.brand}</div>
                <div className='m-2 flex '><div className='mr-1'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div>{item.ratings}</div></div>
                <div onClick={()=>
                {
                    handleRemoveProduct(item)
                    
                }
                    } className='text-lg hover:cursor-pointer m-2 hover:text-red-600' >REMOVE</div>
                </div>
             </div>
            </div>
            <div className='flex justify-center ml-[200px] '>
                <div><button className='w-[200px] h-[50px] rounded-lg bg-green-500 hover:bg-green-600 text-white mt-2'>Pay ₹{item.price*item.quantity}</button></div>
            </div>
            </div> 
        </>
    )
}

export default BuyProduct