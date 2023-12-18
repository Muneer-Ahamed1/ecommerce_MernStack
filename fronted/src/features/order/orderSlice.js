import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderApi';
const initialState = {
    orders: [],
    status: 'idle',
    currentOrder: null,
    totalOrders: 0,
    errorHandler:{
        err:false,
        message:""
    }
  };

  export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order,thunkAPI) => {
        try{
        console.log(order)
      const response = await createOrder(order);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
        }
        catch(e) {
            thunkAPI.rejectWithValue(e);

        }
    }
  );


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: { 
    resetOrder:(state)=>{
        state.currentOrder=null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderAsync.pending,(state)=>{
        state.status="loading";
    })
    .addCase(createOrderAsync.fulfilled,(state,{payload})=>{
        state.status="success";
        state.currentOrder=payload;
        state.orders.push(payload);
    })
    .addCase(createOrderAsync.rejected,(state,{payload})=>{
        state.status="rejected";
        state.errorHandler.err=true;
        state.currentOrder=null;
        state.errorHandler.message=payload.message;
    })
  }

})

export default orderSlice.reducer;
export const {resetOrder}=orderSlice.actions;
