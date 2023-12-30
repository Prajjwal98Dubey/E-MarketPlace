import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { modifyDate } from './helper/dateModifier'
import { Link } from 'react-router-dom'
const GET_MY_ORDER_HISTORY = 'http://localhost:5001/getmypreviousorders'
const PreviousOrders = () => {
    const [orders, setOrders] = useState([])
    const isMounted = useRef(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`
                }
            }
            const currToken = JSON.parse(localStorage.getItem("userDetails")).token
            const getMyPrevOrders = async () => {
                const { data } = await axios.post(GET_MY_ORDER_HISTORY, {
                    token: currToken
                }, config)
                setOrders(data)
                setIsLoading(false)
                
            }

            getMyPrevOrders()
        }
    }, [])

    return (
        <>
            <Header />
            <div className='flex justify-center text-xl mt-4 font-Roboto font-bold'>Order Summary</div>
            <div className='font-Roboto'>
                {isLoading ? <div className='flex justify-center text-xl font-semidbold mt-5'>Loading...</div> :
                orders.length===0 ? <div className='text-xl text-center font-medium mt-[15px] '>No Previous Orders...</div> :
                    <div className='mb-[30px]'>
                        {
                            orders.map((order)=>(
                                <div>
                                <div key={order.createdAt} className='w-[1250px] h-[350px] border border-purple-400 shadow-sm shadow-purple-300 rounded-lg m-2 overflow-x-scroll overflow-y-hidden  '>
                                <div className=' m-3 flex justify-start text-xl font-semibol;'>Order Date :
                                    {modifyDate(order.createdAt).map((d)=>(
                                        <span className='text-xl ml-1 font-bold'>{d}</span>
                                    ))}
                                 </div>
                                    <div className='flex mb-[5px]'>
                                        {
                                            order.history[0].map((ord)=>(
                                                <Link to={`/product?pid=${ord.product[0]._id}`}><div key={ord._id} className='m-2 hover:cursor-pointer hover:underline'>
                                  <img src={ord.product[0].image} alt="loading" className="w-[350px] h-[200px]" />
                              <div className='w-[350px] h-[80px] flex justify-between'>
                                    <div>
                        <div className='text-md font-semibold ml-[5px]'>{ord.product[0].name}</div>
                                    <div className='text-sm ml-[5px]'>{ord.product[0].brand}</div>
                               </div>
            <div className='text-xl font-semibold mr-[5px]'>₹{ord.product[0].price}</div>
                                    
                                </div>
                                                </div> </Link>
                                            ))
                                        }</div>
                                    </div>
                                    </div>
                            ))
                        }

                    </div>

                }
            </div>
        </>
    )
}

export default PreviousOrders