const mongoose=require("mongoose");
const {connect,dbName}=require("../../config/index")
const dbConnection=async()=>{
    try {
        await mongoose.connect(connect)
        console.log("connected");

    }
    catch(e){
        throw new Error("DB is not connecting");

    }
}
module.exports=dbConnection;
