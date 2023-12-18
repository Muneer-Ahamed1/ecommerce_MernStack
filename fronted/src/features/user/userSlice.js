import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserOrder } from "./userApi";

export const fetchUserOrderAsync=createAsyncThunk("/order/userOrder",async (data,thunkApi)=>{
    try{
        const response=await fetchUserOrder(data);
        return response.data;
    }
    catch(e) {
        throw thunkApi.rejectWithValue(e.message);

    }
})
const initialState={
    loading:false,
    userOrder:[],
    error:{
        error:false,
        message:""
    }
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUserOrderAsync.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(fetchUserOrderAsync.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.userOrder=payload
        })
        builder.addCase(fetchUserOrderAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.error.error = true;
            state.error.message = payload;
        });
        
    }
})
export default userSlice.reducer;
