const mongoose = require("mongoose");

const channelModel =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim:true,
    },
    password:{
        type:String,Number,
        trim:true,
    },
    withgoogle:{
        type:Boolean,
        trim:true,
    }
});


const ChannelModel = mongoose.model("userdetail",channelModel)

module.exports = ChannelModel;