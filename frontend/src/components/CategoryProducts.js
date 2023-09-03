import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import SearchWatch from './SearchWatch'
import SideBar from './SideBar'
import { useSelector } from 'react-redux'
const API="http://localhost:5001/products"

const CategoryProducts = () => {
    const[searchParams]=useSearchParams()
    const[items,setItems]=useState([])
    const[isLoading,setIsLoading]=useState(true)
    const filterPrice=useSelector((store)=>store.filter.filterPrice)
    const filterRating=useSelector((store)=>store.filter.filterRating)
    const filterSortBy=useSelector((store)=>store.filter.filterSortBy)
    useEffect(()=>{
        const getItems=async()=>{
            const data = await fetch(API)
            const json=await data.json()
            const filterData=json.filter((item)=>item.category===searchParams.get("q"))
            if(filterPrice==='' && filterRating==='' && filterSortBy===''){
              setItems(filterData)
              setIsLoading(false)
            }
            else{
              if (filterSortBy!==''){
                  if(filterSortBy==='low'){
                    filterData.sort(function(a,b){return a.price-b.price})
                  }
                  if(filterSortBy==='high'){
                    filterData.sort(function(a,b){return b.price-a.price})
                  }
                  if(filterSortBy==='rating'){
                    filterData.sort(function(a,b){return b.ratings-a.ratings})
                  }
                  setItems(filterData)
                  setIsLoading(false)
              }
              if(filterPrice!==''){
                const filteringFilterData=filterData.filter((item)=>item.price>=filterPrice)
                setItems(filteringFilterData)
                setIsLoading(false)
              }
              if(filterRating!==''){
                const filteringFilterData=filterData.filter((item)=>item.ratings>=filterRating)
                setItems(filteringFilterData)
                setIsLoading(false)
              }
              
              if(filterPrice!=='' && filterRating!==''){
                const filteringFilterData=filterData.filter((item)=>item.price>=filterPrice && item.ratings>=filterRating)
                setItems(filteringFilterData)
                setIsLoading(false)
              }

            }
           
        }
        getItems()

    },[searchParams,filterPrice,filterRating,filterSortBy])

    // if(isLoading){
    //     return <div>Loading</div>
    // }
  return (
    <>

       <div className='p-2 bg-gray-200 h-full'>
         <Header/>
         <Main/>
         {isLoading ? <div className='flex justify-center'>loading</div> :<div className='bg-white rounded-lg mt-2'>
          <div className='flex '>
            <div className=''><SideBar/></div>
            <div className=''>{items.map((prod)=><div className=''><SearchWatch prod={prod}/></div>)} </div> 
         </div></div>}
         
       </div>
     </>
   
  )
}

export default CategoryProducts