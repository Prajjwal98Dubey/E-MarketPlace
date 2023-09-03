import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import SideBar from './SideBar'
import SearchWatch from './SearchWatch'
import { useSelector } from 'react-redux'
const API = "http://localhost:5001/products"

const SearchProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const filterPrice = useSelector((store) => store.filter.filterPrice)
  const filterRating = useSelector((store) => store.filter.filterRating)
  const filterSortBy = useSelector((store) => store.filter.filterSortBy)

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetch(API)
      const json = await data.json()
      const filterData = json.filter((item) => item.name.toLowerCase().includes(searchParams.get("q")) || item.description.toLowerCase().includes(searchParams.get("q")))
      if (filterPrice === '' && filterRating === '') {
        if (filterSortBy !== '') {
          if (filterSortBy === 'low') {
            filterData.sort(function (a, b) { return a.price - b.price })
          }
          if (filterSortBy === 'high') {
            filterData.sort(function (a, b) { return b.price - a.price })
          }
          if (filterSortBy === 'rating') {
            filterData.sort(function (a, b) { return a.rating - b.rating })
          }
        }
        setProducts(filterData)
        setIsLoading(false)
      }
      else {
        const filteringFilterData = filterData.filter((item) => item.price >= filterPrice && item.ratings >= filterRating)
        if (filterSortBy !== ''){
          if (filterSortBy === 'low') {
            filteringFilterData.sort(function (a, b) { return a.price - b.price })
          }
          if (filterSortBy === 'high') {
            filteringFilterData.sort(function (a, b) { return b.price - a.price })
          }
          if (filterSortBy === 'rating') {
            filteringFilterData.sort(function (a, b) { return b.ratings - a.ratings })
          }
        }
        setProducts(filteringFilterData)
        setIsLoading(false)
      }
    }
    getProducts()
  }, [searchParams, filterPrice, filterRating,filterSortBy])
  return (
    <>
      <div className='p-2 bg-gray-200 h-full'>
        <Header />
        <Main />
        <div className='flex'>
          <SideBar />
          <div className='w-full h-full mr-2'>
            {isLoading && <div>loading</div>}
            {products.map((prod) => <SearchWatch key={prod._id} prod={prod} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchProducts