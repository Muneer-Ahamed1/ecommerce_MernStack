const errorHandler=(err,req,res,next) =>{
    const{message,status}=err;
    res.status(status||500).json({error:message})
}

module.exports=errorHandler;