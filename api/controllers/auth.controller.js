const User = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require("../utils/error");
const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        const error = errorHandler(400, 'All Fields are required!');
        return next(error);
    }
    try{
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({...req.body,password:hashedPassword});
        await newUser.save();
        res.json('signup successful')
    }catch(err){
        // res.status(500).json({message:err.message})
        next(err)
    }
}

const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        next(errorHandler(400,'All Fields are required!'))
    }
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(400,'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'Invalid Password'));
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest} = validUser._doc;
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
    }catch(err){
        next(err);
    }
}

module.exports = {signup,signin}