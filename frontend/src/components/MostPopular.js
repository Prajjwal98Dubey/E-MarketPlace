
import React from 'react'
import {useState,useEffect} from 'react'
const API="http://localhost:5001/products"

const MostPopular = () => {
    const[products,setProducts]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        const getProducts=async()=>{
            const data = await fetch(API)
            const json=await data.json()
            setProducts(json)
            setIsLoading(false)
        }
        getProducts()
    

    },[])
    if(isLoading){
      return <div className='flex justify-center items-center'>Loading...</div>
    }

    const getPopular = (products,categories)=>{
        const data = products.filter((prod)=>prod.category===categories)
        let maxiRating=-1
        let maxiObj=null
        for(const d of data){
           if(d.ratings > maxiRating)
           {
            maxiRating=d.ratings
            maxiObj=d
           }
        }
        return maxiObj      
    }
  return (
    <div className='bg-white w-full h-full flex flex-wrap mt-2 rounded-lg p-2'>
      <div className=' hover:cursor-pointer w-[400px] h-[500px] hover:bg-blue-200 hover:rounded-xl hover:shadow-xl m-1'>
        <div className='flex justify-center items-center'>
        <img className="w-[300px] h-[200px] m-3 rounded-xl" src={getPopular(products,"Electronics").image} alt="loading" />
        </div>
        <div className='text-2xl font-bold text-center m-3'>{getPopular(products,"Electronics").name}</div>
        <div className='font-light text-sm text-center m-3 '>{getPopular(products,"Electronics").description}</div>
        <div className='text-center font-bold text-3xl m-2'>₹{getPopular(products,"Electronics").price}</div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-green-500 rounded-lg m-1 hover:bg-green-600'>BUY NOW</button></div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-orange-400 rounded-lg hover:bg-orange-600'>ADD TO CART</button></div>
      </div>
      <div className=' hover:cursor-pointer w-[400px] h-[480px]  hover:bg-blue-200 hover:rounded-xl hover:shadow-xl m-1'>
        <div className='flex justify-center items-center'>
        <img className="w-[300px] h-[200px] m-3 rounded-xl" src={getPopular(products,"Automobile").image} alt="loading" />
        </div>
        <div className='text-2xl font-bold text-center m-3'>{getPopular(products,"Automobile").name}</div>
        <div className='font-light text-sm text-center m-3 '>{getPopular(products,"Automobile").description}</div>
        <div className='text-center font-bold text-3xl m-3'>₹{getPopular(products,"Automobile").price}</div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-green-500 rounded-lg m-1 hover:bg-green-600'>BUY NOW</button></div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-orange-400 rounded-lg hover:bg-orange-600'>ADD TO CART</button></div>
      </div>
      <div className=' hover:cursor-pointer w-[400px] h-[480px]  hover:bg-blue-200 hover:rounded-xl hover:shadow-xl m-1'>
        <div className='flex justify-center items-center'>
        <img className="w-[300px] h-[200px] m-3 rounded-xl" src={getPopular(products,"Clothing").image} alt="loading" />
        </div>
        <div className='text-2xl font-bold text-center m-3'>{getPopular(products,"Clothing").name}</div>
        <div className='font-light text-sm text-center m-3 '>{getPopular(products,"Clothing").description}</div>
        <div className='text-center font-bold text-3xl m-3'>₹{getPopular(products,"Clothing").price}</div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-green-500 rounded-lg m-1 hover:bg-green-600'>BUY NOW</button></div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-orange-400 rounded-lg hover:bg-orange-600'>ADD TO CART</button></div>
      </div>
      <div className=' hover:cursor-pointer w-[400px] h-[480px]  hover:bg-blue-200 hover:rounded-xl hover:shadow-xl m-1'>
        <div className='flex justify-center items-center'>
        <img className="w-[400px] h-[200px] m-3 rounded-xl" src={getPopular(products,"Games").image} alt="loading" />
        </div>
        <div className='text-2xl font-bold text-center m-3'>{getPopular(products,"Games").name}</div>
        <div className='font-light text-sm text-center m-3 '>{getPopular(products,"Games").description}</div>
        <div className='text-center font-bold text-3xl m-3'>₹{getPopular(products,"Games").price}</div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-green-500 rounded-lg m-1 hover:bg-green-600'>BUY NOW</button></div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-orange-400 rounded-lg hover:bg-orange-600'>ADD TO CART</button></div>
      </div>
      <div className=' hover:cursor-pointer w-[400px] h-[480px]  hover:bg-blue-200 hover:rounded-xl hover:shadow-xl m-1'>
        <div className='flex justify-center items-center'>
        <img className="w-[300px] h-[200px] m-3 rounded-xl" src={getPopular(products,"Shoes").image} alt="loading" />
        </div>
        <div className='text-2xl font-bold text-center m-3'>{getPopular(products,"Shoes").name}</div>
        <div className='font-light text-sm text-center m-3 '>{getPopular(products,"Shoes").description}</div>
        <div className='text-center font-bold text-3xl m-3'>₹{getPopular(products,"Shoes").price}</div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-green-500 rounded-lg m-1 hover:bg-green-600'>BUY NOW</button></div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-orange-400 rounded-lg hover:bg-orange-600'>ADD TO CART</button></div>
      </div>
      <div className=' hover:cursor-pointer w-[400px] h-[480px]  hover:bg-blue-200 hover:rounded-xl hover:shadow-xl m-1'>
        <div className='flex justify-center items-center'>
        <img className="w-[300px] h-[200px] m-3 rounded-xl" src={getPopular(products,"HomeandFurniture").image} alt="loading" />
        </div>
        <div className='text-2xl font-bold text-center m-3'>{getPopular(products,"HomeandFurniture").name}</div>
        <div className='font-light text-sm text-center m-3 '>{getPopular(products,"HomeandFurniture").description}</div>
        <div className='text-center font-bold text-3xl m-3'>₹{getPopular(products,"HomeandFurniture").price}</div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-green-500 rounded-lg m-1 hover:bg-green-600'>BUY NOW</button></div>
        <div className='flex justify-center'><button className='w-[300px] h-[40px] font-bold  bg-orange-400 rounded-lg hover:bg-orange-600'>ADD TO CART</button></div>
      </div>
    
    
    
    </div>
  )
}

export default MostPopular