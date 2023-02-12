//jshint esversion:6
require('dotenv').config();
const express=require("express");
const app=express();
const router=express.Router();
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const cors=require("cors");
const userRoutes=require('./routes/userRoutes');
const cookieParser = require('cookie-parser');


app.use(cors({credentials: true, origin: 'https://tfsthefashionstore.netlify.app'}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true });

console.log(process.env.PORT);

//app.use(notFound);
//app.use(errorHandler);
app.use('/api/users',userRoutes);



app.listen(process.env.PORT || 3001, function() {
    console.log("Server started on port");
  });
