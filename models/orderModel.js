const mongoose=require("mongoose");
const {ObjectId} = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    items: {
        type: Array,
        default: []
    },
    fullname:{
        type:String,
        trim:true
    },
    mobile:{
        type:String,
        trim:true
    },
    address :{
        type: String,
        trim: true
    },
    city :{
        type: String,
        trim: true
    },
    state :{
        type: String,
        trim: true
    },
    pincode :{
        type: String,
        trim: true
    },
    delivered:{
        type: Number,
        default: 0 
    }
},
    {timesptamps:true}
);



const Order=mongoose.model("order",orderSchema);
module.exports=Order;