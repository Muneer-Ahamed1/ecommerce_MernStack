import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product-list/productListSlice"
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/order/orderSlice";
import userReducer from "./features/user/userSlice"


const Store=configureStore({
    reducer:{
        Products:productReducer, 
        Auth:authReducer,  
        Cart:cartReducer, 
        Order:orderReducer,
        User:userReducer
    }
})

export default Store;