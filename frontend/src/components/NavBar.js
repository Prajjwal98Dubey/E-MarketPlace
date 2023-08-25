import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const API="http://localhost:5001/products"

const NavBar = () => {
    const [suggestions,setSuggestions]=useState([])
    const[isLoading,setIsLoading]=useState(true)
    const[text,setText]=useState("")

    useEffect(()=>{
        const getSuggestions=async()=>{
            const data = await fetch(API)
            const json=await data.json()
            const filterData = json.filter((item)=>item.name.toLowerCase().includes(text.toLowerCase()) || item.description.toLowerCase().includes(text.toLowerCase()) )
            setSuggestions(filterData)
            setIsLoading(false)
        }
           const timer=setTimeout(()=>{
                getSuggestions()
           },330)
           return ()=>{
             clearTimeout(timer)
           }
    },[text])
  return (
    <>
    
    <div className='flex justify-center sticky top-1 z-10'>
    <div className='relative'>
    <input className='w-[600px] h-[45px] text-xl pl-2 border border-black rounded-xl' value={text} onChange={(e)=>setText(e.target.value)} />
    <Link to={"/search?q="+text}><div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div></Link>
    { text  &&  <div className='absolute bg-white w-[600px] border border-t-gray-400 rounded-lg p-1'>
      <ul className='cursor-pointer'>
        {suggestions.map((suggest)=> <li className='h-[30px] rounded-lg hover:bg-gray-300 p-1'>{suggest.name}</li>)} 
      </ul>
    </div>}
   
  </div>
  </div>
  
  </>
  )
}

export default NavBar