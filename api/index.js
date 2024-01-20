const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('../api/routes/user.route');
const authRoutes = require('../api/routes/auth.route');
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database');
}).catch(err=>{
    console.log(err);
})
const app = express();

app.use(express.json());
app.listen(3000,()=>{
    console.log('server connected at port 3000!');
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);