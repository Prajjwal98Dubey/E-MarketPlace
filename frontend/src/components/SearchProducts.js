
import React, { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from './Header'
import CategoryDisplay from './CategoryDisplay'
import Main from './Main'
import SideBar from './SideBar'
import SearchWatch from './SearchWatch'
const API="http://localhost:5001/products"

const SearchProducts = () => {
    const[products,setProducts]=useState([])
    const[isLoading,setIsLoading]=useState(true)
    const[searchParams]=useSearchParams()

    useEffect(()=>{
        const getProducts=async()=>{
            const data = await fetch(API)
            const json=await data.json()
            const filterData = json.filter((item)=>item.name.toLowerCase().includes(searchParams.get("q")) || item.description.toLowerCase().includes(searchParams.get("q")))
            setProducts(filterData)
            setIsLoading(false)
        }
        getProducts()


    },[searchParams])
  return (
    <>
       <div className='p-2 bg-gray-200 h-full'>
         <Header/>
         <Main/>
            <div className='flex'>
               <SideBar/>
               <div className='w-full h-full mr-2'>
                {isLoading && <div>loading</div>}
                {products.map((prod)=><SearchWatch key={prod._id} prod={prod}/>)}
               </div>
               </div>
         </div>
    </>
  )
}

export default SearchProducts