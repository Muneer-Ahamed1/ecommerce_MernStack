import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAllProducts, fetchProductsByFilter, sortProducts, productDetail, category,brands } from "./productListApi.js"

const initialState = {
    product: [],
    totalCount: 100,
    status: "",
    productDetail: null
}

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllproducts', async () => {
    const response = await fetchAllProducts();
    return response.data;
})

export const fetchProductsByFilterAsync = createAsyncThunk('product/fetchProductsByFilter', async (data) => {
    console.log(data)
    const { page, Default_Limit, filterHandle } = data
    console.log(Default_Limit)

    const response = await fetchProductsByFilter(filterHandle, page, Default_Limit);
    const sendData = { data: response.data, totalCount: response.totalCount };

    return sendData
})
export const sortProductsAsync = createAsyncThunk('product/sortProductsAsync', async (data) => {
    let { filterHandle, vl } = data;
    const response = await sortProducts(filterHandle, vl);
    return response.data;
})

export const fetchProductDetailAsync = createAsyncThunk('product/productDetatils', async (id) => {
    const response = await productDetail(id);
    console.log(response.data);
    
    return response.data;
})

export const fetchCategoryAsync=createAsyncThunk('product/category',async ()=>{
  const response=await category();
  return response.data
})

export const fetchBrandsAsync=createAsyncThunk('product/brands',async ()=>{
    const response=await brands();
    return response.data
  })
  



export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProductsAsync.pending, (state) => {
            state.status = "loading"
        })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.product = action.payload;
            })
            .addCase(fetchAllProductsAsync.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(fetchProductsByFilterAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProductsByFilterAsync.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                const { data, totalCount } = payload;
                state.totalCount = totalCount;
                state.product = data;
            })
            .addCase(sortProductsAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.product = action.payload;

            })

            .addCase(fetchProductDetailAsync.pending, (state, action) => {
                state.status="loading"
            })

            .addCase(fetchProductDetailAsync.fulfilled,(state,{payload})=>{
                state.productDetail=payload
                state.status="success"
            })
            .addCase(fetchCategoryAsync.pending,(state,action)=>{
                state.status="loading"
            })
            .addCase(fetchCategoryAsync.fulfilled,(state,{payload})=>{
                state.category=payload
            })
            .addCase(fetchBrandsAsync.pending,(state,action)=>{
                state.status="loading"
            })
            .addCase(fetchBrandsAsync.fulfilled,(state,{payload})=>{
                state.category=payload
            })
            
    }
})

export default productSlice.reducer;