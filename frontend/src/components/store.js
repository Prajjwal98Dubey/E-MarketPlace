import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import productSlice from './productSlice'
import filterSlice from './filterSlice'

const store = configureStore(
    {
        reducer: {
             cart:cartSlice,
             product:productSlice,
             filter:filterSlice
        }

    }
)

export default store