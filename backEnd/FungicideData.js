const mongoose = require("mongoose");

const channelModel =  new mongoose.Schema({
    cropName:{
        type:String,
        required:true,
        trim: true
    },
    Fungicide:{
        type:String,
        required: true,
        trim:true,
    },
    Disease:{
        type:String,
        required: true,
        trim:true,
    }
    
});


const ChannelModel = mongoose.model("fungicide",channelModel)

module.exports = ChannelModel;