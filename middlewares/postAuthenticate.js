const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

const postAuthenticate=async (req,res,next) =>{
    try{
        const token=req.body.token;
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
      
        const rootUser = await User.findOne({_id:verifyToken.id,"tokens.token":token});
        if(!rootUser){throw new Error('user not found')};

        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    }
    catch(err){
        res.status(401).send("unauthoirized:no token provided");
        console.log(err);
    }
}

module.exports=postAuthenticate;