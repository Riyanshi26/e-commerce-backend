const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

//function to register a new user
const addUser = asyncHandler(async (req, res) => {
    let { name, email, password } = req.body;

    //check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    //create a new user
    password = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, email, password
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Error Occurred")
    }

});

//function for user login
const authUser = asyncHandler(async (req, res) => {
    let token;
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        token = generateToken(user._id);
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

});


module.exports = { addUser, authUser };