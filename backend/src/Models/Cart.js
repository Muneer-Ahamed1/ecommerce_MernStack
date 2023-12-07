const mongoose = require("mongoose");
const {Schema}=mongoose;
const products = require("./Product");
const user = require("./User");
const cartSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: products
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
    color: {
        type: Schema.Types.Mixed,
        required: [true, 'Please provide a color']
    },
    size: {
        type: Schema.Types.Mixed,
        required: [true, 'Please provide a size']
    },
    quantity:{
        type:Number,
        required:true
    }


});

module.exports = mongoose.model("Cart", cartSchema);



