const User = require("../models/user.model");
const bcryptjs = require('bcryptjs');

const signup = async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        return res.status(400).json({message:'All fields are required!'})
    }
    try{
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({...req.body,password:hashedPassword});
        await newUser.save();
        res.json('signup successful')
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {signup}