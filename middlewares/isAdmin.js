const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

const isAdmin=async (req,res,next) =>{
    try{
        const token=req.body.token;
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
      
        const rootUser = await User.findOne({_id:verifyToken.id,"tokens.token":token});
        if(!rootUser){throw new Error('user not found')};

        if(rootUser.role==0){throw new Error('admin resource! access denied!');}
        next();
    }
    catch(err){
        res.status(401).send("unauthoirized:no token provided");
        console.log(err);
    }
}

module.exports=isAdmin;