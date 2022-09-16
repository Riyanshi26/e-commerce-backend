const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const generateToken = require("../utils/generateToken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    //there will be 2 role: 0->user,1->admin
    role:{
        type: Number,
        default: 0   //0 is for user
    },
    history: {
        type: Array,
        default: []
    }
    
},
    {timesptamps:true}
);

const User=mongoose.model("user",userSchema);
module.exports=User;