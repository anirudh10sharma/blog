let express=require('express');
const Passport = require('passport');
let router=express.Router();
let islogged=require("../islogged");
const blog=require('../models/blog');
const user=require('../models/user');
const mongoose=require('mongoose');

router.get("/blogs/:id",async (req,res)=>{
    const singleblog=await blog.findById(req.params.id).populate({path:'reviews',
    populate: {path:'author'}});
    await singleblog.populate('author').execPopulate();
    res.render("./blogs/show",{blog:singleblog});
})

router.delete('/blogs/:id',async (req,res)=>{
    await blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
})
router.patch('/blogs/authenticate/:id',async (req,res)=>{
    await blog.findByIdAndUpdate(req.params.id,{authenticated: true});
    res.redirect(`/blogs/${req.params.id}`);
})
router.patch('/blogs/deauthenticate/:id',async (req,res)=>{
    await blog.findByIdAndUpdate(req.params.id,{authenticated: false});
    res.redirect(`/blogs/${req.params.id}`);
})

router.get('/',async (req,res)=>{
    const blogs=await  blog.find({});
    res.render('./blogs/blogs',{blogs: blogs});
});

router.get('/blog/new',islogged,(req,res)=>{
    res.render('./blogs/new')});

router.post('/blogs/new',islogged,async (req,res)=>{
    const b=await blog.create(req.body.blog);
    b.author=req.user;
    b.authenticated=req.user.authenticated;
    b.save();
    res.redirect('/');
})


module.exports=router;