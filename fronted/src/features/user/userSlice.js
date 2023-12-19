import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserOrder,fetchUserAddress,updateUser } from "./userApi";


const initialState={
    loading:false,
    userOrder:[],
    userAddress:null,
    error:{
        error:false,
        message:""
    }
}

export const fetchUserOrderAsync=createAsyncThunk("/user/fetchUserOrder",async (data,thunkApi)=>{
    try{
        const response=await fetchUserOrder(data);
        return response.data;
    }
    catch(e) {
        throw thunkApi.rejectWithValue(e.message);

    }
})

export const fetchUserAddressAsync=createAsyncThunk("/user/fetchUserAddress",async(id,thunkApi)=>{
    try{
        const response=await fetchUserAddress(id);
        return response.data;
    }
    catch(e){
        throw thunkApi.rejectWithValue(e.message);
    }
})
 export const updateUserAsync=createAsyncThunk("/user/updateUser",async(data,thunkApi)=>{
    try{
        const response=await updateUser(data);
        return response.data;
    }
    catch(e) {
        throw thunkApi.rejectWithValue(e.message);
    }


 })




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
        builder.addCase(fetchUserAddressAsync.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchUserAddressAsync.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.userAddress=payload

        })
        builder.addCase(fetchUserAddressAsync.rejected,(state,{payload})=>{
            state.loading = false;
            state.error.error = true;
            state.error.message = payload;
        })
        builder.addCase(updateUserAsync.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(updateUserAsync.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.userAddress=payload
        })
        builder.addCase(updateUserAsync.rejected,(state,{payload})=>{
            state.loading=false;
            state.error.error=true;
            state.error.message=payload;
        })
        
    }
})
export const selectUserInfo=(state)=>state.User.userAddress;
export default userSlice.reducer;
