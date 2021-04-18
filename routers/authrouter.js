const express=require('express');
const router=express.Router();
const passport=require('passport');
require("passport-google-oauth20");
const islogged=require('../islogged')

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/auth/google'
}));
router.get('/logout',async(req,res)=>{
  req.logout();
  res.redirect("/");
})
router.get('/user/:id',async(req,res)=>{
  res.render("./blogs/user");
})
  module.exports = router;