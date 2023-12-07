const express=require("express");
const router=express.Router();
const {fetchCartByUser,addToCart,deleteFromCart,updateCart}=require("../Controllers/CartController");


router.route("/").post(addToCart).delete(deleteFromCart).put(updateCart).get(fetchCartByUser)

module.exports=router;