const ErrorHandling = require("../utils/Errorhandling");
const catchAsyncError = require("./catchAsyncError");
const jwt=require('jsonwebtoken');
const User=require('../src/Models/UserModel');

const isAuthentication = catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    
    if(!token){
        return next(new ErrorHandling(401,"You have not logged In"));
    }
    
    const decodeToken=jwt.verify(token,process.env.JWT_SECRET_ID);
    req.user=await User.findById(decodeToken.id);
    next();

});

module.exports={isAuthentication};