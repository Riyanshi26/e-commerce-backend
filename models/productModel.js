const mongoose=require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        //type: ObjectId,
        // ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    image :{
        type: String,
        trim: true
    }
},
    {timesptamps:true}
);



const Product=mongoose.model("product",productSchema);
module.exports=Product;