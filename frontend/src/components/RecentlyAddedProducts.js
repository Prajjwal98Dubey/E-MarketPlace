import React, { useDebugValue } from 'react'
import { useDispatch } from 'react-redux'
import{Link} from 'react-router-dom'
import { addToCart } from './cartSlice'
import 'react-toastify/dist/ReactToastify.css';
import{toast} from 'react-toastify'
import { addToBuyPage } from './productSlice';

const RecentlyAddedProducts = ({recent}) => {
    const dispatch=useDispatch()
    const handleAddToCart=(recent)=>{
        dispatch(addToCart(recent))
        toast.success(recent.name +" added!!!",{
          position:"bottom-right"
        })
    }
    const handleAddToBuyPage=(recent)=>{
      dispatch(addToBuyPage(recent))
    }
  return (
    <>
       <Link to={"/product?pid="+recent._id}><div className='m-2 hover:border hover:border-gray-400 cursor-pointer p-1 hover:scale-95 hover:shadow-xl hover:rounded-xl'>
        <div className='w-[350px] h-full'>
          <div>
            <img className='w-full h-[200px] rounded-xl' src={recent.image} alt="loading" />
          </div>
          <div className='flex justify-start font-serif font-semibold m-1'>{recent.name}</div>
          <div className='flex justify-start m-1'>{recent.description}</div>
          <div className='flex justify-center font-semibold m-1'>{recent.ratings}<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#e7d513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
          <div className='flex justify-center'>
            <Link to={"/buy?pid="+recent._id}><button className='w-[90px] h-[35px] rounded-lg mr-1 bg-green-500 hover:bg-green-700 flex justify-center items-center font-semibold' onClick={()=>{
              handleAddToCart(recent)
              handleAddToBuyPage(recent)
              }}>BUY</button></Link>
            <button onClick={(event)=>{
              event.preventDefault()
              handleAddToCart(recent)
              }} className='w-[90px] h-[35px] rounded-lg  bg-amber-400 hover:bg-amber-700 flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></button>
          </div>

        </div>

       </div>
       </Link>

    </>
  )
  
}

export default RecentlyAddedProducts




// return (
//   <>
//   <div className='w-full h-full flex justify-center '>
//   <div className='w-[700px] h-[400px] hover:cursor-pointer p-2'>
//       <div className='flex justify-center items-center'>
//           <img className='w-[500px] h-[200px] rounded-xl hover:scale-105' src={recent.image} alt="loading" />
//       </div>
//       <div className='text-2xl font-bold text-center'>{recent.name}</div>
//       <div className='flex justify-center text-xl font-light text-center'>{recent.description}</div>
//       <div className='text-3xl font-extrabold text-center'>₹{recent.price}</div>
//       <div className='flex justify-center p-2 m-1'>
//       <div><button className='w-[200px] h-[50px] bg-green-500 rounded-lg font-bold mr-2 hover:bg-green-600'>BUY NOW</button></div>
//       <div><button className='w-[200px] h-[50px] bg-amber-500 rounded-lg font-bold hover:bg-amber-600'>ADD TO CART</button></div>
//       </div>
//   </div>
//   </div>
//   </>
// )