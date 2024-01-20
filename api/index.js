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

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
app.listen(3000,()=>{
    console.log('server connected at port 3000!');
});