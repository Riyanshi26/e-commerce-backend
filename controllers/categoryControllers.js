const asyncHandler=require("express-async-handler");
const Category=require("../models/categoryModel");


//function to create a new category
const createCat=asyncHandler(async(req,res) => {
    const category= await Category.create(req.body);
    category.save((err,data)=>{
        if(err){
            return res.status(400).json(err);
        }
        else{
            res.json({data});
        }
    });
    

});

//totally delete a category
const deleteCategory=asyncHandler(async(req,res) => {
    try{
        
        const result = await Category.deleteOne( {_id: req.body.id});
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


module.exports={createCat,deleteCategory};