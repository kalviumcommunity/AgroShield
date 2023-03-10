const mongoose = require("mongoose");

const channelModel =  new mongoose.Schema({
    cropName:{
        type:String,
        required:true,
        trim: true
    },
    diseaseName:{
        type:String,
        required: true,
        trim:true,
    },
    solution:{
        type:String,
        required: true,
        trim:true,
    },
    UserName:{
        type:String,
        required:true,
        trim:true,
    },
    type:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
        trim:true,
    }  
});


const ChannelModel = mongoose.model("userherbicide",channelModel)

module.exports = ChannelModel;