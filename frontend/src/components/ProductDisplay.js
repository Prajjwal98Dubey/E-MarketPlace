
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import { useDispatch } from 'react-redux'
import { addToCart } from './cartSlice'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { addToBuyPage } from './productSlice'
import { Link } from 'react-router-dom'
import productReview from './productReview'
import { handleAddToMyCart } from './helper/addToMyCart'
const API = "http://localhost:5001/products"

const ProductDisplay = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [show, SetShow] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetch(API)
      const json = await data.json()
      const filterData = json.filter((item) => item._id === searchParams.get("pid"))
      setProduct(filterData)
      setIsLoading(false)
    }
    getProduct()
  }, [searchParams])
  if (isLoading) {
    return <div>loading</div>
  }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    toast.success(product.name + " added!!!", {
      position: "top-center"
    })
  }
  const handleAddProduct = (product) => {
    dispatch(addToBuyPage(product))
  }
  return (
    <>
      <div className="p-2 bg-gray-200 h-full animate-fade">
        <Header />
        <Main />
        <div>
          <div className='flex p-1'>
            <div className="w-[270px] h-[290px] m-1 bg-white rounded-lg">
              <div className='flex justify-center m-1 p-1'>
                <div>
                <img className='w-[230px] h-[90px] border border-gray-300 rounded-lg m-[3px]' src={product[0].image} alt="loading" />
                <img className='rounded-lg m-[3px] w-[230px] h-[90px] border border-gray-300' src={product[0].image}alt="loading" />
                <img className=' rounded-lg m-[3px] w-[230px] h-[90px] border border-gray-300' src={product[0].image} alt="loading" />
                </div>
              </div>
            </div>
            <div className="w-[500px] h-[290px] m-1 rounded-lg bg-white">
              <div className='flex justify-center'>
                <div>
                  <div className='text-3xl font-bold text-center m-2'>{product[0].name}</div>
                  <div className='text-xl font-light text-center'>{product[0].brand}</div>
                  <div className='flex justify-center hover:scale-95 hover:cursor-pointer'><img src={product[0].image} alt="loading" className='w-[300px] h-[200px] rounded-xl ' /></div>
                </div>
              </div>
            </div>
            <div className="w-[270px] h-[290px] m-1 bg-white rounded-lg">
              <div className='flex justify-center mt-[89px]'>
                <div>
                  <div className='text-3xl font-extrabold text-center m-1'>₹{product[0].price}/-</div>
                  <div className='text-xl line-through font-semibold text-center m-1'>₹{(product[0].price) + 2000}/-</div>
                  <div className='text-xl font-bold text-center m-1'>⭐{product[0].ratings}</div>
                </div>
              </div>
            </div>
            <div className="w-[270px] h-[290px] m-1 bg-white rounded-lg ">
              <div className='p-2 mt-[70px]'>
                <div><Link to={"/buy?pid=" + product[0]._id}><button className='w-[240px] h-[45px] font-bold bg-green-500 m-2 rounded-xl hover:bg-green-700' onClick={() => {
                  handleAddToCart(product[0])
                  handleAddProduct(product[0])
                }}>BUY NOW</button></Link></div>
                <div onClick={() => {
                  handleAddToCart(product[0])
                  handleAddToMyCart(product[0])
                  }}><button className='w-[240px] h-[45px] font-bold bg-amber-500 m-2 rounded-xl hover:bg-amber-700'>ADD TO CART</button></div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[130px] bg-white rounded-lg'>
          <div className='text-center font-bold text-3xl pt-1'>{product[0].name}</div>
          <div className='flex justify-center'>
            <div className='text-center font-semibold text-xl w-[850px] mt-2'>{product[0].description}</div> </div>
        </div>
        <div className='h-fit bg-white mt-2 rounded-lg p-2'>
          <div className='flex justify-center text-xl font-bold'>Reviews</div>
          {productReview.slice(0, 5).map((review,index) =>
            <div key={index} className=' h-fit m-2 p-2 rounded-lg border border-gray-300'>
              <div className='flex justify-center'>
                <div className='mt-[2px] p-1'>⭐{review.ratings}</div>
                <div className='text-xl font-bold p-1'>{review.title}</div>
              </div>
              <div>{review.description}</div>
            </div>
          )}
          {show ? <div>{productReview.slice(5,).map((review,index) =>
            <div key={index} className=' h-fit m-2 p-2 rounded-lg border border-gray-300'>
              <div className='flex justify-center'>
                <div className='mt-[2px] p-1'>⭐{review.ratings}</div>
                <div className='text-xl font-bold p-1'>{review.title}</div>
              </div>
              <div>{review.description}</div>
            </div>
          )} </div> : <div className='flex justify-center'><div className='text-xl font-semibold w-fit  hover:cursor-pointer hover:text-blue-800' onClick={() => SetShow(true)}>All Reviews</div></div>}
        </div>
      </div>



    </>
  )
}

export default ProductDisplay