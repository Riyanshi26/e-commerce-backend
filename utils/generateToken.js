//generating JWT token so that frontend can authenticaate backend
const jwt=require("jsonwebtoken");
const generateToken=(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "30d",
    });
};

module.exports=generateToken;