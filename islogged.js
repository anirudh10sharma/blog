const express=require("express");
const Passport=require("passport");
require("passport-google-oauth20");

const islogged=(req,res,next)=>{
    if(!req.isAuthenticated()){
        res.redirect('/auth/google');
    }
    else{
        next();
    }
}
 
module.exports = islogged;