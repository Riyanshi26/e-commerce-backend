const asyncHandler=require("express-async-handler");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

//function to create a new order
const addOrder=asyncHandler(async(req,res) => {
  
    const order=await Order.create(req.body);
    const result = await User.findOneAndUpdate({_id:req.userID},{history: []});
    res.send("order created succesfully");
    });

const delivered=asyncHandler(async(req,res) => {
   
    try{
        const result = await Order.findOneAndUpdate({_id:req.body.id},
            {$set:{delivered:1}});

        result.save((err,data)=>{
            if(err){
                return res.status(400).json(err);
            }
            else{
                res.json({data});
            }
        });
    }
    catch(err){
        res.status(401).send("cannot find or update the data");
        console.log(err);
    }
});
module.exports={addOrder,delivered};