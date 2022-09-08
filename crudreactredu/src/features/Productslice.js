import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const addproduct = createAsyncThunk("product/addproduct", async({category_id, name,  description, brand, selling_price, original_price, qty,image, newarrival,popular,diskon }) => {
    const res = await axios.post(`/api/store-product`, {category_id, name,description, brand, selling_price, original_price, qty,image, newarrival,popular,diskon })
   return res.data
})
export const getprod = createAsyncThunk("product/getprod", async() => {
    const res = await axios.get(`/api/view-product`)
   return res.data.produ
})
export const hpsprod = createAsyncThunk("product/hpsprod", async(id) => {
    await axios.delete(`/api/delete-product/${id}`)
   return id
})

const prodentity = createEntityAdapter({  
    selectId: (product) => product.id
})


const productslice = createSlice({
    name: 'product',  
    initialState:  prodentity.getInitialState({
        isLoading : false,
        isError : null

    }),
    extraReducers: {
       
        [getprod.pending]: (state) => {
            state.isLoading = true
        },
        [getprod.fulfilled]: (state, action) => {
            state.isLoading = false
            prodentity.setAll(state,  action.payload) 
                  },
        [getprod.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = action.error            
        },
       
        [hpsprod.pending]: (state) => {
            // state.isLoading = true
        },
        [hpsprod.fulfilled]: (state, action) => {
            // state.isLoading = false
            prodentity.removeOne(state,  action.payload) 
          
        },
        [hpsprod.rejected]: (state, action) => {
            // state.isLoading = false
            // state.isError = action.error            
        },
        
    }
})  

export const productselect = prodentity.getSelectors(state => state.product)
export default productslice.reducer