import React from 'react'
import {Link} from 'react-router-dom'

const CategoryDisplay = ({category}) => {
  if(!category){
    return null
  }
  return (
   <> 
       <Link to={"/category?q="+category.category}><div className='text-gray-700 hover:text-black hover:cursor-pointer' >
        {category.category}
       </div>
       </Link>
        
   </>
  )
}


{/* <Link to={"/category?q="+category.category}><div className='hover:cursor-pointer hover:text-blue-600  '>
            <div><img className='w-[130px] h-[110px] rounded-lg border border-black'src={category.categoryImg} alt="loading" /></div>
            <div className='text-center font-semibold'>{category.category}</div>
        </div></Link> */}
export default CategoryDisplay