import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, decrementQuantity, removeFromCart } from './cartSlice'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { addToBuyPage } from './productSlice'
const CartProducts = ({ item }) => {
    // const items=useSelector(store=>store.cart.items)
    const dispatch = useDispatch()
    useEffect(() => {

    }, [dispatch])
    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item))
        toast.error(item.name + " removed!!!", {
            position: "top-center"
        })

    }
    const handleIncrement = (item) => {
        dispatch(addToCart(item))
        toast.info(item.name + " Quantity Increased", {
            position: "top-center"
        })
    }
    const handleDecrement = (item) => {
        dispatch(decrementQuantity(item))
        toast.warning(item.name + " Quantity Descreased", {
            position: "top-center"
        })
    }
    const handleAddProduct=(item)=>{
        dispatch(addToBuyPage(item))
    }

    return (
        <>
            <div className='flex justify-around hover:border hover:border-purple-500 hover:cursor-pointer shadow-lg rounded-lg p-2 m-2'>
                <div className='w-1/3'>
                    <div className='flex'>
                        <div className='m-2'>
                            <img src={item.image} alt="loading" className='w-[200px] h-[170px] rounded-lg ' />
                            <div className="flex justify-center m-1">
                                <button onClick={() => handleRemoveFromCart(item)} className='w-[50px] rounded-lg mr-1 bg-red-500 hover:bg-red-600 hover:cursor-pointer h-[30px] flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></button>
                                  <Link to={"/buy?pid="+item._id}> <button onClick={()=>{
                                    handleIncrement(item)
                                    handleAddProduct(item)
                                }} className='w-[50px] rounded-lg bg-green-500 hover:bg-green-600 h-[30px] flex justify-center hover:cursor-pointer items-center'><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg></button></Link>
                            </div>
                        </div>
                        <div className='ml-2 flex items-center'>
                            <div>
                                <div>{item.name}</div>
                                <div>{item.brand}</div>
                                <div>{item.ratings}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-1/3 h-[200px] flex justify-center items-center'>
                    <div className=' flex justify-center items-center'>
                        <div onClick={() => handleDecrement(item)} className='w-[70px] flex justify-center rounded-l-lg border border-black hover:cursor-pointer hover:bg-gray-400'>-</div>
                        <div className='w-[70px] flex justify-center  border border-black'>{item.Quantity}</div>
                        <div onClick={() => handleIncrement(item)} className='w-[70px] flex justify-center rounded-r-lg border border-black hover:cursor-pointer hover:bg-gray-400'>+</div>
                    </div>
                </div>
                <div className='w-1/3 flex justify-center items-center'>
                    <div className='text-3xl font-bold'>₹{item.price * item.Quantity}</div>
                </div>
            </div>
        </>
    )
}

export default CartProducts