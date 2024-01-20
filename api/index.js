const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database');
}).catch(err=>{
    console.log(err);
})
const app = express();

app.listen(3000,()=>{
    console.log('server connected at port 3000!');
});