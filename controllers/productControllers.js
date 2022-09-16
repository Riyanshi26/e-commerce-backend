const asyncHandler=require("express-async-handler");
const Product=require("../models/productModel");
const formidable = require('formidable');

const _ =require("lodash");
const User = require("../models/userModel");



//function to create a new product
const createProduct=asyncHandler(async(req,res) => {
    console.log("hello");
    //console.log(req.body);
    const product=await Product.create(req.body);

    res.send("product created succesfully");
    

    });
//delete a product from user cart
const deleteCartProduct=asyncHandler(async(req,res) => {
    try{
        const result = await User.findOneAndUpdate({_id:req.userID},{$pull:{history: { id: req.body.id }}});
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

//totally delete a product
const deleteProduct=asyncHandler(async(req,res) => {
    try{
        
        const result = await Product.deleteOne( {_id: req.body.id});
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

//update a product
const updateProduct=asyncHandler(async(req,res) => {

    try{
        const result = await Product.findOneAndUpdate({_id:req.body.id},
            {$set:{name:req.body.name, 
                description:req.body.description, 
                price:req.body.price, 
                category:req.body.category,
                quantity:req.body.quantity,
                image:req.body.image}});

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

const addCart=asyncHandler(async(req,res) => {
    try{
        const result = await User.findOneAndUpdate({_id:req.userID},{$push:{history:req.body}});
        result.save((err,data)=>{
            if(err){
                return res.status(400).json(err);
            }
            else{
                res.json({data});
            }
        });

        
        console.log(result);
    }
    catch(err){
        res.status(401).send("cannot find or update the data");
        console.log(err);
    }
});




module.exports={createProduct,deleteCartProduct,updateProduct,addCart,deleteProduct};