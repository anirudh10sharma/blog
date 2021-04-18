const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    img: {type: String},
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {type: String},
    authenticated:{type: Boolean,default: false}
    
}) 

const user=mongoose.model("user",userschema);
module.exports= user;