
import React, { useEffect } from 'react'
import { useState } from 'react'
import RecentlyAddedProducts from './RecentlyAddedProducts'
const API = "http://localhost:5001/products"
const RecentlyAdded = () => {
    const [products, setProducts] = useState([])
    const [recently, setRecently] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getProducts = async () => {
            const data = await fetch(API)
            const json = await data.json()
            setProducts(json)
            setIsLoading(false)
        }
        getProducts()

    },[])
    useEffect(() => {
        if (isLoading === false) {
            const sorted_products = products.sort(function (a, b) { return b.createdAt - a.createdAt })
            setRecently(sorted_products.slice(0, 6))
        }

    }, [isLoading, products])

    if (isLoading) {
        return <div className='flex justify-center items-center'>Loading...</div>
    }
    return (
        <>
        <div className='flex justify-center '>
            <div className='w-full h-full rounded-xl bg-white flex flex-wrap justify-evenly'>
               {recently.map((recent)=><RecentlyAddedProducts key={recent._id} recent={recent}/>)}
            </div>
            </div>
        </>
    )
}

export default RecentlyAdded