import React from 'react'
import { Link } from 'react-router-dom'

const SearchWatch = ({prod}) => {
  return (
    <Link to={"/product?pid="+prod._id}><div className='w-[1000px] h-[300px] m-2 shadow-lg hover:cursor-pointer hover:border hover:border-solid hover:border-purple-600 hover:scale-95  bg-white pt-[50px] rounded-lg '>
        <div className="flex justify-around">
            <div>
              <img src={prod.image} alt="loading" className='w-[250px] h-[200px] rounded-xl' />
            </div>
            <div className='w-[400px] text-center pt-2'>
                <div className='text-2xl font-bold m-1'>{prod.name}</div>
                <div className='text-lg font-light m-1'>{prod.description}</div>
                <div className='flex justify-center'>
                <div className='text-2xl font-bold'>{prod.ratings}</div>
                <div className='mt-[2px] pr-[1px]'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                </div>
                
            </div>
            <div className='font-extrabold text-3xl flex items-center mb-10'>
                ₹{prod.price}
            </div>
        </div>

    </div>
    </Link>
  )
}

export default SearchWatch