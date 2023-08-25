
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import SearchWatch from './SearchWatch'
const API="http://localhost:5001/products"

const CategoryProducts = () => {
    const[searchParams]=useSearchParams()
    const[items,setItems]=useState([])
    const[isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        const getItems=async()=>{
            const data = await fetch(API)
            const json=await data.json()
            const filterData=json.filter((item)=>item.category===searchParams.get("q"))
            setItems(filterData)
            setIsLoading(false)
        }
        getItems()

    },[searchParams])

    // if(isLoading){
    //     return <div>Loading</div>
    // }
  return (
    <>

       <div className='p-2 bg-gray-200 h-full'>
         <Header/>
         <Main/>
         {isLoading ? <div className='flex justify-center'>loading</div> :<div className='bg-white rounded-lg mt-2'>
            {items.map((prod)=><div className='flex justify-center'><SearchWatch prod={prod}/></div>)}  
         </div>}
         
       </div>
     </>
   
  )
}

export default CategoryProducts