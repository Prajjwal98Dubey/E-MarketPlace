import React from 'react'
import Header from './Header'
import Main from './Main'
import RecentlyUsedBreakLine from './RecentlyUsedBreakLine'
import RecentlyAdded from './RecentlyAdded'
import BreakLine from './BreakLine'
import MostPopular from './MostPopular'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import ImageSlider from './ImageSlider'

const Body = () => {
  return (
    <div className="p-2 bg-gray-200 h-full">
      <Header/>
      <Main/>
      <ImageSlider/>
      <RecentlyUsedBreakLine/>
      <RecentlyAdded/>
      <BreakLine/>
      <MostPopular/>
      <Footer/>
      </div>
  )
}

export default Body