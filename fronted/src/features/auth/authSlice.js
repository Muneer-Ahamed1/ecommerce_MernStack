import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, Login ,updateUser} from "./authAPI";

export const createUserAsync = createAsyncThunk("/auth/register", async (data) => {
    const response = await register(data);
    return response.data;
})

export const LoginAsync = createAsyncThunk("/auth/login", async (data,thunkAPI) => {
    try {
        const response = await Login(data);
        console.log(response)
        return response
    }
    catch (e) {
        console.log(e);
    throw thunkAPI.rejectWithValue(e);
    }

})

export const updateUserAsync=createAsyncThunk("/auth/update",async(data,thunkAPI)=>{
    try{
        console.log(data);
        const response=await updateUser(data);
        return response.data;

    }
    catch(e){
        throw thunkAPI.rejectWithValue(e);

    }
})

const auth = createSlice({
    name: "auth",
    initialState: {
        isLoginUser: null,
        loading: false,
        errorHandler:{
            err:false,
            message:null
        }

    },
    reducers: {
        SignOut:(state)=>{
            state.isLoginUser=null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUserAsync.pending, (state, action) => {
            state.loading = true;

        })
            .addCase(createUserAsync.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isLoginUser = payload;
            })
            .addCase(createUserAsync.rejected, (state) => {
                state.errorHandler.err = true;
            })
            .addCase(LoginAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoginAsync.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isLoginUser = payload

            })
            .addCase(LoginAsync.rejected, (state, { payload }) => {
                state.errorHandler.err = true;
                state.errorHandler.message = payload.data;

            })
            .addCase(updateUserAsync.pending,(state)=>{
                state.loading=true;
            })
            .addCase(updateUserAsync.fulfilled,(state,{payload})=>{
                state.isLoginUser=payload;
                       
            })
            .addCase(updateUserAsync.rejected,(state,{payload})=>{
                state.errorHandler.err=true;
                state.errorHandler.message=payload;
            })

    }

})
export const {SignOut}=auth.actions;
export default auth.reducer;