import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'




export const getcat = createAsyncThunk("gcategori/etcat", async() => {
    const res = await axios.get(`/api/view-category`)
    return res.data.category    
})

export const addcat = createAsyncThunk("gcategori/addcat", async({name, slug, desc}) => {
    const res = await axios.post(`/api/store-category`, {name, slug, desc})
    return res.data  
})
export const editcat = createAsyncThunk("gcategori/editcat", async({id,name, slug, desc}) => {
     await axios.put(`/api/update-category/${id}`, {name, slug, desc})
    return id
})
export const deletecat = createAsyncThunk("gcategori/editcat", async(id) => {
     await axios.delete(`/api/delete-category/${id}`)
    return id  
})


const proty = createEntityAdapter({  
    selectId: (category) => category.id
})


const categorislice = createSlice({
    name: 'category',  
    initialState:  proty.getInitialState({
        isLoading: false,
        isError: null,
     }),
    extraReducers: {
       
        [getcat.pending]: (state) => {
            state.isLoading = true
        },
        [getcat.fulfilled]: (state, action) => {
            state.isLoading = false
            proty.setAll(state,  action.payload)          
        },
        [getcat.rejected]: (state) => {
            state.isLoading = false   
        },
        [addcat.pending]: (state) => {
            state.isLoading = true
        },
        [addcat.fulfilled]: (state, action) => {
            state.isLoading = false
            proty.addOne(state,  action.payload)          
        },
        [addcat.rejected]: (state, action) => {
            state.isLoading = false   
            state.isError = action.errors
        },
        [editcat.pending]: (state) => {
            state.isLoading = true
        },
        [editcat.fulfilled]: (state, action) => {
            state.isLoading = false
            proty.updateOne(state, {id: action.payload.id, updates:action.payload})          
        },
        [editcat.rejected]: (state, action) => {
            state.isLoading = false   
            state.isError = action.errors
        },
        [deletecat.pending]: (state) => {
            state.isLoading = true
        },
        [deletecat.fulfilled]: (state, action) => {
            state.isLoading = false
            proty.removeOne(state, action.payload)          
        },
        [deletecat.rejected]: (state, action) => {
            state.isLoading = false   
            state.isError = action.errors
        },
        
    }
})  

    

export const categoriselect = proty.getSelectors(state => state.category)
export default categorislice.reducer