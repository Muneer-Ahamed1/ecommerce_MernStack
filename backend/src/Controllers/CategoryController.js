const Category=require("../Models/Category");
const expressAsyncHandler=require("express-async-handler");
const  ErrorClass=require("../Middleware/ErrorClass");  
const fetchCategoryController=expressAsyncHandler(async (req,res)=>{
    try{
    const category=await Category.exec();
    res.status(200).send(category);
    }
    catch(e){
        throw new ErrorClass(e);
    }
})
const createCategoryController=(async(req,res,next)=>{
    try{
        const create=await Category.create(req.body);
        await create.save();
        res.status(200).json({success:"Success created !!"});
    }
    catch(e) {
        next(new ErrorClass(e.message,404));
    }
})
module.exports={fetchCategoryController,createCategoryController};