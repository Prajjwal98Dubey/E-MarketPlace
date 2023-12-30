import axios from 'axios'
import React, { useCallback, useRef } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DUMMY_IMG } from './helper/images'
const ALL_PRODUCTS = 'http://localhost:5001/all'
const MostPopular = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const[limit,setLimit] = useState(9)
  const observer = useRef()
  const lastProductObject = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
          setLimit(limit=>limit+9)
      }
    },{
      rootMargin:"0px 0px 300px 0px"
    })
    if (node) observer.current.observe(node)
  }, [isLoading])
  useEffect(() => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const getProducts = async () => {
      const { data } = await axios.get(`${ALL_PRODUCTS}?skip=${limit-9}&limit=${limit}`, config)
      setProducts([...products,...data])
      setIsLoading(false)
    }
    getProducts()
  }, [limit])
  return (
    <>
      <div className='bg-white w-full h-full flex flex-wrap mt-2 rounded-lg p-2 font-Roboto'>
        {
          isLoading ? <div className='flex justify-center font-Roboto font-semibold'>Loading...</div> :
            products.map((prod, index) => {
              if (products.length === index + 1) {
                return <div key={index} ref={lastProductObject} className='flex justify-center items-center'>
                  <div className=' hover:cursor-pointer w-[400px] h-fit hover:bg-blue-200 hover:rounded-xl hover:shadow-xl p-2'>
                    <div className='flex justify-center items-center'>
                      <img className="w-[300px] h-[200px] rounded-xl" src={prod.image!==null ? prod.image : DUMMY_IMG } alt="loading" />
                    </div>
                    <div className='text-2xl font-bold text-center m-3'>{prod.name}</div>
                    <div className='font-light text-sm text-center m-3 '>{prod.description}</div>
                    <div className='text-center font-bold text-3xl m-2'>₹{prod.price}</div>
                    <Link to={"/buy?pid=" + prod._id}><div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-green-500 rounded-lg m-1 hover:bg-green-600'>BUY NOW</button></div></Link>
                    <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-orange-400 rounded-lg hover:bg-orange-600'>ADD TO CART</button></div>
                  </div>
                </div>
              }
              else {
                return <div key={index} className='flex justify-center items-center'>
                  <div className=' hover:cursor-pointer w-[400px] h-fit hover:bg-blue-200 hover:rounded-xl hover:shadow-xl p-2'>
                    <div className='flex justify-center items-center'>
                      <img className="w-[300px] h-[200px] rounded-xl" src={prod.image!==null ? prod.image : DUMMY_IMG } alt="loading" />
                    </div>
                    <div className='text-2xl font-bold text-center m-3'>{prod.name}</div>
                    <div className='font-light text-sm text-center m-3 '>{prod.description}</div>
                    <div className='text-center font-bold text-3xl m-2'>₹{prod.price}</div>
                    <Link to={"/buy?pid=" + prod._id}><div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-green-500 rounded-lg m-1 hover:bg-green-600'>BUY NOW</button></div></Link>
                    <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-orange-400 rounded-lg hover:bg-orange-600'>ADD TO CART</button></div>
                  </div>
                </div>
              }
            }
            )

        }
      </div>
    </>
  )
}

export default MostPopular