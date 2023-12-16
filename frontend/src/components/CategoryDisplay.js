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
export default CategoryDisplay