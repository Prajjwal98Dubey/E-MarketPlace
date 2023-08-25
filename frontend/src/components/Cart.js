import React from 'react'
import Header from './Header'
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import CartProducts from './CartProducts'
import { clearCart } from './cartSlice'

const Cart = () => {
    const items=useSelector(store=>store.cart.items)
    const totalAmount=useSelector(store=>store.cart.cartAmount)
    const dispatch=useDispatch()
    const handleClearCart=()=>{
      dispatch(clearCart())
    }
  return (
    <>
    <Header/>
    <Main/>
    <div className='p-4 m-2'>
        {items.map((item)=><CartProducts item={item}/>)}
    </div>
    {totalAmount ?
  <div className='w-full h-[55px] z-10 flex justify-evenly p-2 bg-white text-2xl fixed bottom-0 border border-t-gray-700'>
    <div onClick={()=>handleClearCart()} className='hover:underline hover:cursor-pointer hover:text-red-600'>Clear Cart</div>
    <div><button className='w-[300px] h-[40px] rounded-lg hover:bg-orange-600 bg-[#fb641b]'>Place Order</button></div>
    <div>Subtotal:₹{totalAmount}</div>
    </div>
     : null }
    
    </>
  )
}

export default Cart

/// this is the chech somthing .//////