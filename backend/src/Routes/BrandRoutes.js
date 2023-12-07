const express=require("express");
const router=express.Router();
const {fetchBrandController,createBrandController}=require("../Controllers/BrandController")

router.route("/").post(createBrandController).put(fetchBrandController)


module.exports=router;