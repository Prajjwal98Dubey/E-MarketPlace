import React, { useEffect, useState } from 'react'
import Header from './Header'
import Main from './Main'
import RecentlyUsedBreakLine from './RecentlyUsedBreakLine'
import RecentlyAdded from './RecentlyAdded'
import BreakLine from './BreakLine'
import MostPopular from './MostPopular'
import Footer from './Footer'
import ImageSlider from './ImageSlider'
import axios from 'axios'
const ALL_PRODUCTS = 'http://localhost:5001/all'
const Body = () => {
  const [items,setItems] = useState([])
  useEffect(()=>{
    const config={
      headers:{
        'Content-type':'application/json'
      }
    }
    const getProducts=async()=>{
        const {data} = await axios.get(`${ALL_PRODUCTS}?skip=5&limit=10`,config)
        setItems(data)
    }
    getProducts()
  },[])
  return (
    <div className="p-2 bg-gray-200 h-full">
      {console.log(items)}
      <Header/>
      <Main/>
      <ImageSlider/>
      <RecentlyUsedBreakLine/>
      <RecentlyAdded/>
      <MostPopular/>
      <Footer/>
      </div>
  )
}

export default Body