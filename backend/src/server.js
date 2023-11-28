const dotenv=require("dotenv")
dotenv.config({
    path:"./src/.env"
})
const {PORT}=require("./config/index.js");
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`)
})

