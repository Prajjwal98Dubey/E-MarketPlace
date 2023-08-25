import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name:'product',
    initialState:{
        item:[],        
    },
    reducers:{
        addToBuyPage:(state,action)=>{
           const tempProduct={...action.payload,quantity:1}
           state.item=tempProduct
          
        },
        incrementProduct:(state)=>{
              state.item.quantity+=1
        },
        decrementProduct:(state)=>{
            state.item.quantity-=1
        },
        removeProduct:(state)=>{
            state.item=[]
        }
    }
})

export const {addToBuyPage,incrementProduct,decrementProduct,removeProduct} = productSlice.actions
export default productSlice.reducer