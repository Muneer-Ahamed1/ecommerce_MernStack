const Brand=require("../Models/Brand.js");
const expressAsyncHandler=require("express-async-handler");
const  ErrorClass=require("../Middleware/ErrorClass");  

const fetchBrandController=expressAsyncHandler(async (req,res)=>{
    try{
    const brand=await Brand.exec();
    res.status(201).send(brand);
    }
    catch(e){
        throw  new ErrorClass(e.message)
    }
})

const createBrandController=(async(req,res)=>{
    try{
        const create=await Brand.create(req.body);
        await create.save();
        res.status(200).json({success:"Success created !!"});
    }
    catch(e) {
        throw new Error(e.message,404);
    }
})

module.exports={createBrandController,fetchBrandController};