const mongoose= require('mongoose');
const user=require("./user");
const review=require("./reviews");

const blogschema=new mongoose.Schema({
title:{type:String},
author:{type: mongoose.Schema.Types.ObjectId,
ref: 'user'},
content:{type:String},
sub:{type:String},
image:{type:String},
authenticated:{type:Boolean,default:false},
about:{type:String},
reviews:[{type: mongoose.Schema.Types.ObjectId,
ref: 'review'}
],
time : { type : Date, default: Date.now }

});

const blog=mongoose.model("blog",blogschema);
module.exports=blog;