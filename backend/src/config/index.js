const dotenv=require("dotenv");
dotenv.config({path:"./src/.env"});

module.exports={
    PORT:process.env.PORT,
    connect:process.env.connect,
    dbName:process.env.dbName,
    jwtSecretKey:process.env.jwtSecretKey,

}