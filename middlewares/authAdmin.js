const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

const AuthAdmin=async (req,res,next) =>{

    try{
        const token=req.cookies.jwtoken;
        console.log(token);
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
      
        const rootUser = await User.findOne({_id:verifyToken.id});
        if(!rootUser){throw new Error('user not found')};
   
        if(rootUser.role==0){throw new Error('admin resource! access denied!');}
        if(rootUser.role==1)
        {req.rootUser=rootUser;}
        next();
    }
    catch(err){
        res.status(401).send("unauthoirized:no token provided");
        console.log("there is an error",err);
    }
}

module.exports=AuthAdmin;