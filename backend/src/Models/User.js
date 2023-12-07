const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema=new Schema({
email:{
    type:String,
    required:[true,"Required Email"],
    unique: true
},
password:{
    type:Buffer,
    required:[true,"Required Password"],
    max:[12,"Max password length"],
    min:[3,"Min password length"]
},
userName:{required:true,type:String}
,role:{
    type:String,
},
addresses:[Schema.Types.Mixed],
salt:Buffer

},{timestamps:true})

module.exports=mongoose.model("User",userSchema);



