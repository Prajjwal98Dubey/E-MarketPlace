import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from './cartSlice'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { addToBuyPage } from './productSlice';
import axios from 'axios';
const ADD_PRODUCTS = 'http://localhost:5001/addProducts'
const RecentlyAddedProducts = ({ recent }) => {
  const dispatch = useDispatch()
  const handleAddToCart = (recent) => {
    dispatch(addToCart(recent))
    toast.success(recent.name + " added!!!", {
      position: "bottom-right"
    })
  }
  const handleAddToBuyPage = (recent) => {
    dispatch(addToBuyPage(recent))
  }
  const handleAddToMyCart=async(recent)=>{
    const config = {
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`
      }
    }
    await axios.post(ADD_PRODUCTS,{
      token:JSON.parse(localStorage.getItem("userDetails")).token,
      productId:recent._id
    },config)

  }

  return (
    <>
      <Link to={"/product?pid=" + recent._id}><div className=' font-Roboto w-[1100px] h-[320px] m-2 shadow-lg hover:cursor-pointer hover:border hover:border-solid hover:border-purple-600  bg-white pt-[50px] rounded-lg '>
        <div className="flex justify-around">
          <div>
            <img src={recent.image} alt="loading" className='w-[250px] h-[200px] rounded-xl' />
          </div>
          <div className='w-[400px] text-center pt-2'>
            <div className='text-2xl font-bold m-1'>{recent.name}</div>
            <div className='text-lg font-light m-1'>{recent.description}</div>
            <div className='flex justify-center'>
              <div className='text-2xl font-bold'>{recent.ratings}</div>
              <div className='mt-[8px] pr-[1px] ml-[2px]'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div>
            </div>
            <div className='flex justify-center p-4'>
              <div className='flex '>
                <Link to={"/buy?pid="+recent._id}><div className='m-2'><button className='w-[130px] h-[35px] bg-green-500 hover:bg-green-700 cursor-pointer rounded-md' onClick={()=>{
                  handleAddToCart(recent)
                  handleAddToBuyPage(recent)
                }}>BUY</button></div></Link>
                <div className=" m-2 flex justify-center rounded-md p-1 bg-amber-400 w-[130px] h-[35px] hover:bg-amber-600 cursor-pointer" onClick={(event) => {
                  event.preventDefault()
                  !localStorage.getItem("userDetails") && handleAddToCart(recent)
                  localStorage.getItem("userDetails") && handleAddToMyCart(recent)
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                </div>
              </div>
            </div>

          </div>
          <div className='font-extrabold font-Roboto text-4xl flex items-center mb-10'>
            ₹{recent.price}
          </div>
        </div>

      </div>
      </Link>

    </>
  )

}

export default RecentlyAddedProducts


