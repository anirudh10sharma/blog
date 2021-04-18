const mongoose=require("mongoose");
const user=require("./user");
const reviewschema=new mongoose.Schema({
    author:{type: mongoose.Schema.Types.ObjectId,
    ref:'user'},
    comment:{type: String},


})
const review=mongoose.model('review',reviewschema)

module.exports=review;