
import React from 'react'
import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { applyFiltersPrice, applyFiltersRating } from './filterSlice'
const SideBar = () => {
  const[price,setPrice]=useState('')
  const[ratings,setRatings]=useState('')
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(applyFiltersPrice(price))
      dispatch(applyFiltersRating(ratings))
    
},[price,dispatch,ratings])
  return (
    <>
    <div className="w-[280px] h-[500px] border border-black mt-2 bg-white">
          <div className='flex justify-center m-3'>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg></div>
          <div>Filters</div></div>
          <div>
            <div>
              <form>
                <label for="price">Choose Price: </label>
                <select className='border border-black' name="price" id="price" value={price} onChange={(e)=>{
                  setPrice(e.target.value)
                  }}>
                  <option value="1000">&gt;1000</option>
                  <option value="5000">&gt;5000</option>
                  <option value="10000">&gt;10,000</option>
                </select>
              </form>
            </div>
            <div>
              <form>
                <label for="rating">Choose Rating: </label>
                <select className='border border-black' name="rating" id="rating" value={ratings} onChange={(e)=>{
                  setRatings(e.target.value)
                  }}>
                  <option value="4.7">&gt;4.7</option>
                  <option value="4.4">&gt;4.4</option>
                  <option value="4">&gt;4</option>
                </select>
              </form>
            </div>
          </div>
          

    </div>
    </>
  )
}

export default SideBar
