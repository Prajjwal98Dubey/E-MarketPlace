import React, { useState } from 'react'
import Header from './Header'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const API = "http://localhost:5001/new-products"

const SellerPage = () => {
  const [sname, setSName] = useState("")
  const [sdesc, setSDesc] = useState("")
  const [sprice, setSPrice] = useState("")
  const [sbrand, setSBrand] = useState("")
  const [scategory, setSCategory] = useState("")
  const [simage, setSImage] = useState("")
  const [sratings, setSRatings] = useState("")
  const [product, setProduct] = useState([])

  const addProduct = async () => {
    const data = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: sname,
        description: sdesc,
        price: sprice,
        brand: sbrand,
        category: scategory,
        image: simage,
        ratings: sratings

      })
    }).then((res) => res.json())
    setProduct([...product, data])
    toast.success("Your Product Added Successfully!!!", {
      position: 'top-center'
    })
    setSName("")
    setSDesc("")
    setSPrice("")
    setSCategory("")
    setSBrand("")
    setSImage("")
    setSRatings("")

  }



  return (
    <>
      <Header />
      <div className=' w-full h-full flex flex-col justify-center items-center text-2xl font-semibold'>
        <div className='mt-4'>We are Happy to onboard you as a seller on our platform...</div></div>
      <div className='flex justify-center m-2'>
        <div className='w-[850px] border border-gray-300 h-[450px] overflow-y-scroll rounded-lg shadow-xl flex justify-center'>
          <div>


            {/* ----------------------------------- */}

            <div><input type="text" placeholder='Enter the name of product' className='p-1 text-black text-center w-[550px] h-[50px] m-2 rounded-lg border border-gray-400' value={sname} onChange={(e) => setSName(e.target.value)} /></div>
            <div> <input type="text" placeholder='Enter the description of product' className='p-1 text-black text-center w-[550px] h-[50px] m-2 rounded-lg border border-gray-400' value={sdesc} onChange={(e) => setSDesc(e.target.value)} /></div>
            <div> <input type="text" placeholder='Enter the price of product' className='p-1 text-black text-center w-[550px] h-[50px] m-2 rounded-lg border border-gray-400' value={sprice} onChange={(e) => setSPrice(e.target.value)} /></div>
            <div> <input type="text" placeholder='Enter the brand name of product' className='p-1 text-black text-center w-[550px] h-[50px] m-2 rounded-lg border border-gray-400' value={sbrand} onChange={(e) => setSBrand(e.target.value)} /></div>
            <div> <input type="text" placeholder='Enter the category of product' className='p-1 text-black text-center w-[550px] h-[50px] m-2 rounded-lg border border-gray-400' value={scategory} onChange={(e) => setSCategory(e.target.value)} /></div>
            <div> <input type="text" placeholder='Enter the image of product' className='p-1 text-black text-center w-[550px] h-[50px] m-2 rounded-lg border border-gray-400' value={simage} onChange={(e) => setSImage(e.target.value)} /></div>
            <div> <input type="text" placeholder='Enter the ratings of product' className='p-1 text-black text-center w-[550px] h-[50px] m-2 rounded-lg border border-gray-400' value={sratings} onChange={(e) => setSRatings(e.target.value)} /></div>
            <div className='flex justify-center'><button onClick={() => addProduct()}
              disabled={sname === "" || sdesc === "" || sprice === "" || sbrand === "" || scategory === "" || simage === "" || sratings === ""}
              className='w-[250px] disabled:cursor-not-allowed disabled:bg-gray-400 h-[40px] bg-green-500 rounded-lg m-1 hover:cursor-pointer hover:bg-green-600'>Submit</button></div>
            {/* ---------------------------------------- */}
          </div> </div>

      </div>
    </>
  )
}

export default SellerPage