const product=require("../Models/Product");
const expressAsyncHandler=require("express-async-handler");
const createProcutController=expressAsyncHandler(async(req,res)=>{
const  ErrorClass=require("../Middleware/ErrorClass");  
    try{
        const createProduct =await product.create(req.body)
        createProduct.save();
        res.status(201).json({message:"Successful added"})
    
    }
    catch(err){
        throw new ErrorClass(err.message,404);
    }
    
})

const fetchProducts = expressAsyncHandler(async (req, res) => {
    let query = product.find({});
    console.log(req.query)
   
    if (req.query.category) {
       query = query.find({ category: req.query.category });
    }  if (req.query.brand) {
       query = query.find({ brand: req.query.brand });
    }  if (req.query.sort && req.query.order) {
       query = query.sort({[req.query.sort]:req.query.order});
    } 
    
    if (req.query.page && req.query.limit) {
        const pageSize = req.query.limit;
        const page = req.query.page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);

    }
   
    try {
       const doc = await query.exec();
      res.header("productFilter-count", doc.length);
       res.json(doc);
    } catch (e) {
       console.log(e);
    }
   });

module.exports={createProcutController,fetchProducts};