import { createSlice } from "@reduxjs/toolkit";

const filterSlice= createSlice({
    name:'filter',
    initialState:{
        filterPrice:null,
        filterRating:null,
        filterSortBy:null
    },
    reducers:{
        applyFiltersPrice:(state,action)=>{
            state.filterPrice=action.payload
        },
        applyFiltersRating:(state,action)=>{
            state.filterRating=action.payload
        },
        applyFiltersSortBy:(state,action)=>{
            state.filterSortBy=action.payload
        }
    }
})

export const{applyFiltersPrice,applyFiltersRating,applyFiltersSortBy} = filterSlice.actions
export default filterSlice.reducer