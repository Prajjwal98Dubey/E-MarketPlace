import axios from 'axios'
const ADD_PRODUCTS = 'http://localhost:5001/addProducts'
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

}


