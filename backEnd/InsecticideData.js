const mongoose = require("mongoose");

const channelModel =  new mongoose.Schema({
    cropName:{
        type:String,
        required:true,
        trim: true
    },
    Insecticide:{
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


const ChannelModel = mongoose.model("insecticide",channelModel)

module.exports = ChannelModel;