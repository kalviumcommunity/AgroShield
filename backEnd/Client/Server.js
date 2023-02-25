const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());

const ChannelModel = require("./Data")

// app.use("/",(req,res)=>{
//     res.send("Connection is succesfull");
// })

mongoose.set('strictQuery', false);

// mongodb+srv://anmol123:1234678@cluster0.br2alyu.mongodb.net/?retryWrites=true&w=majority
mongodb://localhost:27017/
mongoose.connect("mongodb://localhost/userdata",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4
})
.then(()=>
{
    app.listen(2000,()=>{
        console.log("connection is successfull");
    })
}
)
.catch((error)=>console.log(error));


app.post("/userinput",(req,res)=>{
    const {cropName, diseaseName, solution,UserName,type} = req.body;
    var channelModel = new ChannelModel()
    channelModel.cropName = cropName
    channelModel.diseaseName = diseaseName
    channelModel.solution = solution
    channelModel.UserName = UserName
    channelModel.type = type


    channelModel.save(async (err,data)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(data);
            
            res.status(200).send({'answer': channelModel})
        }
    })

})

app.get("/userinput",async (req,res)=>{
    const data = await ChannelModel.find().sort({$natural:-1}).limit();
    res.send(data);
    })

// const playlistSchema = new mongoose.Schema({
//     name: String,
//     ctype : String,
//     videos: Number,
//     author : String,
//     active : Boolean,
// })


// const Playlist = new mongoose.model("Playlist",playlistSchema);

// const reactPlaylist = new Playlist({
//     name: "Javascript",
//     ctype : "Front end",
//     videos: 30,
//     author : "Anmol",
//     active : true,
// })

// reactPlaylist.save();