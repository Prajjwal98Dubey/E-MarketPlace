import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import { handleAddToMyCart, handleRemoveFromMyCart } from './helper/addToMyCart'
const SHOW_PRODUCTS = 'http://localhost:5001/showOrders'
const REMOVE_PRODUCT = 'http://localhost:5001/removeProduct'
const MyProfile = () => {
  const [products, setProducts] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const[temp,setTemp]=useState(false)
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
      setProducts(data)
      setIsLoading(false)
    }
    getResults()
  }, [temp])
  return (
    <>
      <Header />
      {isloading ? <div className="flex justify-center">Loading...</div> :
        <div>
          {products.map((prod) => (
            <div key={prod._id} className=' flex justify-around hover:border hover:border-purple-500 hover:cursor-pointer shadow-lg rounded-lg p-2 m-2'>
              <div  className='w-1/3'>
                <div className='flex'>
                  <div className='m-2'>
                    <img src={prod.product[0].image} alt="loading" className='w-[200px] h-[170px] rounded-lg ' />
                    <div className="flex justify-center m-1">
                      <button className='w-[50px] rounded-lg mr-1 bg-red-500 hover:bg-red-600 hover:cursor-pointer h-[30px] flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></button>
                      <Link to={"/buy?pid=" + prod.product[0]._id}> <button onClick={() => {
                      }} className='w-[50px] rounded-lg bg-green-500 hover:bg-green-600 h-[30px] flex justify-center hover:cursor-pointer items-center'><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg></button></Link>
                    </div>
                  </div>
                  <div className='ml-2 flex items-center'>
                    <div>
                      <div>{prod.product[0].name}</div>
                      <div>{prod.product[0].brand}</div>
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
            </div>
          ))}

        </div>
      }
    </>
  )
}

export default MyProfile