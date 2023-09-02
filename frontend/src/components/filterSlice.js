import { createSlice } from "@reduxjs/toolkit";

const filterSlice= createSlice({
    name:'filter',
    initialState:{
        filterPrice:null,
        filterRating:null
    },
    reducers:{
        applyFiltersPrice:(state,action)=>{
            state.filterPrice=action.payload
        },
        applyFiltersRating:(state,action)=>{
            state.filterRating=action.payload
        }
    }
})

export const{applyFiltersPrice,applyFiltersRating} = filterSlice.actions
export default filterSlice.reducer