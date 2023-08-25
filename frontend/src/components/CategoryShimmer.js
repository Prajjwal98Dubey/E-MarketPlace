import React from 'react'

const CategoryShimmer = () => {
  return (
    // <div className='flex justify-evenly w-[1000px] h-[40px]'> 
    <>
    {Array(6).fill("").map((e,index)=><div key={index}><div className='w-[50px] animate-pulse bg-green-400 m-2'></div> </div>)}
    </>
    // </div>
  )
}

export default CategoryShimmer