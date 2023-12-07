const express=require("express");
const router=express.Router();
const {fetchCategoryController,createCategoryController}=require("../Controllers/CategoryController")

router.route("/").post(createCategoryController).put(fetchCategoryController)


module.exports=router;