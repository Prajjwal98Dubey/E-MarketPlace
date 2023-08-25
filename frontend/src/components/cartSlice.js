import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: {
            items: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [],
            cartQuantity: localStorage.getItem("cartQuantity") ? JSON.parse(localStorage.getItem("cartQuantity")) : 0,
            cartAmount: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0
        },
        reducers: {
            addToCart: (state, action) => {
                const itemIndex = state.items.findIndex((item) => item._id === action.payload._id)
                if (itemIndex >= 0) {
                    state.items[itemIndex].Quantity += 1

                }
                else {
                    const tempProduct = { ...action.payload, Quantity: 1 }
                    state.items.push(tempProduct)
                    state.cartQuantity = state.cartQuantity + 1
                    localStorage.setItem("cartQuantity", JSON.stringify(state.cartQuantity))
                }
                localStorage.setItem("items", JSON.stringify(state.items))
                let tempSum = 0
                for (let i = 0; i < state.items.length; i++) {
                    let s=(state.items[i].price)*(state.items[i].Quantity)
                    tempSum += parseInt(s)
                }
                state.cartAmount =tempSum
                localStorage.setItem("total",JSON.stringify(state.cartAmount))

            },
            removeFromCart: (state, action) => {
                const newItems = state.items.filter((item) => item._id !== action.payload._id)
                state.items = newItems
                state.cartQuantity -= 1
                localStorage.setItem("items", JSON.stringify(state.items))
                localStorage.setItem("cartQuantity", JSON.stringify(state.cartQuantity))
                let tempSum = 0
                for (let i = 0; i < state.items.length; i++) {
                    let s=(state.items[i].price)*(state.items[i].Quantity)
                    tempSum += parseInt(s)
                }
                state.cartAmount =tempSum
                localStorage.setItem("total",JSON.stringify(state.cartAmount))


            },
            decrementQuantity: (state, action) => {
                const temp = state.items.findIndex((item) => item._id === action.payload._id)
                if (state.items[temp].Quantity > 1) {
                    state.items[temp].Quantity -= 1
                }
                else {
                    const newItems = state.items.filter((item) => item._id !== action.payload._id)
                    state.items = newItems
                    state.cartQuantity -= 1
                    localStorage.setItem("cartQuantity", JSON.stringify(state.cartQuantity))
                }
                localStorage.setItem("items", JSON.stringify(state.items))
                let tempSum = 0
                for (let i = 0; i < state.items.length; i++) {
                    let s=(state.items[i].price)*(state.items[i].Quantity)
                    tempSum += parseInt(s)
                }
                state.cartAmount = tempSum
                localStorage.setItem("total",JSON.stringify(state.cartAmount))
            },
            clearCart: (state) => {
                state.items = []
                state.cartQuantity = 0
                state.cartAmount=0
                localStorage.setItem("items", JSON.stringify(state.items))
                localStorage.setItem("cartQuantity", JSON.stringify(state.cartQuantity))
                localStorage.setItem("total",JSON.stringify(state.cartAmount))
            }

        }
    }
)

export const { addToCart, removeFromCart, clearCart, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer
