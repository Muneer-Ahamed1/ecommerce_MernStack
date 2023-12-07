const express=require("express");
const router=express.Router();
const {createProcutController,fetchProducts}=require("../Controllers/ProductController")

router.route("/")
.post(createProcutController)
.put(fetchProducts)
router.route("/:id")
.get()
.patch()

module.exports=router;