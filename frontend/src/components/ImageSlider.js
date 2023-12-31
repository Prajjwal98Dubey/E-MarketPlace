
import React, { useState } from 'react'
import images from './images'
const ImageSlider = () => {
  return (
    <>
    <SlideShow images={images}/>
    </>
  )
}

const SlideShow =({images})=>{
    const [active,setActive]=useState(0)
    const nextImage=()=>{
        if (active < images.length -1){
            setActive(active+1)
        }
    }
    const prevImage=()=>{
        if(active > 0){
            setActive(active-1)
        }
    }
    return(
        <>
        <div className='flex justify-center mt-2 relative'>
            <div className=''>
            {images.map((image,index)=>
        <div className={`${active===index?"animate-fade":"hidden"}`}><Slide key={index} active={active} image_url={image.image_url}/></div>
        )}
        <div className='absolute text-6xl top-12 right-4 cursor-pointer' onClick={()=>nextImage()}>&gt;</div>
        <div className='absolute text-6xl top-12 left-4 cursor-pointer' onClick={()=>prevImage()}>&lt;</div>
        <div className='flex justify-center mt-2'>{images.map((image,index)=><div key={index} className={`w-[30px] h-[30px] rounded-full cursor-pointer m-5  ${active===index ? "bg-blue-500 animate-fade" :"bg-gray-400"}`} onClick={()=>setActive(index)}></div>)}</div>
            </div>
        
        </div>

        </>
    )
}
const Slide=({image_url})=>{
    return (
        <>
        <div>
            <img className='w-[1100px] h-[175px] rounded-lg shadow-xl shadow-black border border-gray-300' src={image_url} alt="loading" />
        </div>
        </>
    )
}

export default ImageSlider