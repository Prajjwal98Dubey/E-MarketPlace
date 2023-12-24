import axios from 'axios'
export const handleCheckout=(items)=>{
    
    axios.post('http://localhost:5001/create-checkout-session',{
      items
    }).then((res)=>{
      if(res.data.url){
          window.location.href=res.data.url
      }
    }).catch((err)=>console.log(err.message))
}