const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const jwd=require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const app = express();
app.use(cors())
app.use(express.json());

const ChannelModel = require("./Data")
const Fungicide = require("./FungicideData");
const Insecticide = require("./InsecticideData");
const Herbicide = require("./HerbicideData");
const Biofungicide = require("./Biofungicide");
const Bioinsecticide = require("./Bioinsecticide");

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
    app.listen(2000,()=>{
        console.log("connection is successfull");
    })
}
)
.catch((error)=>console.log(error));


app.post("/userinput",(req,res)=>{
    const {cropName, diseaseName, solution,UserName,type,image} = req.body;
    let Model
    if(type=="fungicide"){
        Model=Fungicide
    }
    else if(type=="insecticide"){
        Model=Insecticide
    }
    else if(type=="herbicide"){
        Model=Herbicide
    }
    else if(type=="bioinsecticide"){
        Model=Bioinsecticide
    }
    else if(type=="biofungicide"){
        Model=Biofungicide
    }

    // if(!Model)
    // {

    // }
    const model = new Model()
    model.cropName = cropName
    model.diseaseName = diseaseName
    model.solution = solution
    model.UserName = UserName
    model.type = type
    model.image = image


    model.save(async (err,data)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(data);
            
            res.status(200).send({'answer': model})
        }
    })

})



app.post("/login",async (req,res)=>{
    const {name,email,password,confirmpassword} = req.body;
    const newpassword= await bcrypt.hash(password,10);

    const detail = new ChannelModel()
    detail.name = name
    detail.email = email
    detail.password = newpassword
    detail.confirmpassword = newpassword


    detail.save(async (err,data)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(data);
            
            res.status(200).send({'answer': detail})
        }
    })

})




app.post("/signup", async (req,res)=>{
    const {email,password} = req.body;

    const check = await ChannelModel.findOne({email:email});

    const ispasswordvalid= await bcrypt.compare(password,check.password);

    if(!check){
        return  {status:"Please check email and password",user:null}
    }

    if(ispasswordvalid){
        const token=jwd.sign({
            email:check.email,
            password:check.password
        },'n8tv3222hk')
        res.json({status:"signed in successfully",user:token})
    }
    else{
        res.json({status:"Please check email and password",user:null})
    }
    // console.log(check)

})




app.get("/userinput",async (req,res)=>{
    const data1 = await( Fungicide.find().sort({$natural:-1}).limit()  );
    const data2 = await( Insecticide.find().sort({$natural:-1}).limit()  );
    const data3 = await( Biofungicide.find().sort({$natural:-1}).limit()  );
    const data4 = await( Bioinsecticide.find().sort({$natural:-1}).limit()  );
    const data5 = await( Herbicide.find().sort({$natural:-1}).limit()  );

    const data = [...data1, ...data2,...data3,...data4,...data5];
    res.send(data);
})



app.get("/fungicide",async (req,res)=>{   
    const data = await Fungicide.find().sort({$natural:-1}).limit();
     res.send({'answer':data});
})
    
    
    
app.get("/insecticide",async (req,res)=>{
        const data = await Insecticide.find().sort({$natural:-1}).limit();
        res.send({'answer': data});
 })  
