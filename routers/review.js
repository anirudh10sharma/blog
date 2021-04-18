const express=require('express');
const router=express.Router();
const review=require("../models/reviews");
const islogged=require("../islogged");
const blog=require("../models/blog");

router.post("/review/:id",islogged,async (req,res)=>{
    const blogo=await blog.findById(req.params.id);
    const rev= await review.create(req.body.review);
    rev.author=req.user;
    rev.save();
    blogo.reviews.push(rev);
    blogo.save();
    res.redirect(`/blogs/${req.params.id}`);
})

module.exports=router;