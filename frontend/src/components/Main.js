import React, { useEffect } from 'react'
import { useState } from 'react'
import CategoryDisplay from './CategoryDisplay'
import CategoryShimmer from './CategoryShimmer'
const API="http://localhost:5001/"

const Main = () => {
   const[items,setItems]=useState([])
   const[isLoading,setIsLoading]=useState(true)

   useEffect(()=>{
    const getItems=async()=>{
         const data = await fetch(API)
         const json=await data.json()
         setItems(json)
         setIsLoading(false)
    }
    getItems()
   },[])
   
  //  if (isLoading){
  //   return <div className="flex justify-center items-center">Loading...</div>
  //  }

  return (
    <>
    <div className='flex justify-center'>
      {isLoading ? <CategoryShimmer/>:<div className='flex justify-around p-4 w-[1000px] h-[50px] rounded-lg mt-2 bg-white'>
        {items.map((item)=><CategoryDisplay key={item._id} category={item}/>)}
    </div>}
    
    </div>
    </>
  )
}

export default Main