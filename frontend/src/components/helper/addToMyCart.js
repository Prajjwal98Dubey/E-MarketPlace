import axios from 'axios'
import { toast } from 'react-toastify'
const ADD_PRODUCTS = 'http://localhost:5001/addProducts'
const REMOVE_PRODUCT = 'http://localhost:5001/removeProduct'
export const handleAddToMyCart = async (recent,temp,setTemp) => {
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`
        }
    }
    await axios.post(ADD_PRODUCTS, {
        token: JSON.parse(localStorage.getItem("userDetails")).token,
        productId: recent._id
    }, config)

    setTemp(!temp)
    toast.success(`${recent.name} Quantity Increased!!!`,{
        position:'top-center'
    })

}
export const handleRemoveFromMyCart=async(id,temp,setTemp)=>{
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`
      }
    }
    await axios.post(REMOVE_PRODUCT,{
      token:JSON.parse(localStorage.getItem("userDetails")).token,
      productId:id

    },config)
    setTemp(!temp)
    toast.error('Quantity Decreased!!!',{
        position:'top-center'
    })
  }

