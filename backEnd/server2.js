const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());

const Fungicide = require("./FungicideData");
const Insecticide = require("./InsecticideData");

// app.use("/",(req,res)=>{
//     res.send("Connection is succesfull");
// })

mongoose.set('strictQuery', false);

// mongodb+srv://anmol123:1234678@cluster0.br2alyu.mongodb.net/?retryWrites=true&w=majority
mongodb://localhost:27017/
mongoose.connect("mongodb://localhost/Agroshield",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4
})
.then(()=>
{
    app.listen(5000,()=>{
        console.log("connection is successfull");
    })
}
)
.catch((error)=>console.log(error));




app.get("/fungicide",async (req,res)=>{
    
    const data = await Fungicide.find().sort({$natural:-1}).limit();
    res.send({'answer':data});
    })



    app.get("/insecticide",async (req,res)=>{
        const data = await Insecticide.find().sort({$natural:-1}).limit();
        res.send({'answer': data});
        })    

