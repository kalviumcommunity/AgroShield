const dotenv = require("dotenv")
const { OAuth2Client } = require('google-auth-library');
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

dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE;
const PORT=process.env.PORT;
const KEY=process.env.KEY;
const ID=process.env.ID;

mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4
})
.then(()=>
{
    app.listen(PORT,()=>{
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

const client = new OAuth2Client(ID);

app.post("/token", async (req, res) => {
    const { tokenold } = req.body;
  
    const ticket = await client.verifyIdToken({
      idToken: tokenold,
      audience: ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const check = await ChannelModel.findOne({ email: email });
    if (!check) {
      // create new account in database
      const name = payload.name;
      const email = payload.email;
  
      const detail = new ChannelModel();
      detail.name = name;
      detail.email = email;
      detail.withgoogle = true;
  
      detail.save(async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // send response once database operation is complete
          res.send({ "name": payload.name, "email": payload.email });
        }
      });
    } else {
      const token = jwd.sign({
        email: check.email,
        name: check.name,
      }, KEY);
      res.json({ status: "signed in successfully", user: token });
    }
  });



app.post("/login",async (req,res)=>{
    const {name,email,password} = req.body;
    const newpassword= await bcrypt.hash(password,10);

    const detail = new ChannelModel()
    detail.name = name
    detail.email = email
    detail.password = newpassword


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

    if(!check){
        return  {status:"Please check email and password",user:null}
    }

    if(check.password){
    const ispasswordvalid= await bcrypt.compare(password,check.password);
    if(ispasswordvalid){
        const token=jwd.sign({
            email:check.email,
            password:check.password
        },KEY)
        res.json({status:"signed in successfully",user:token})
    }
    else{   
        res.json({status:"Please check email and password",user:null})
    }
}

     if(check.withgoogle){
        const token=jwd.sign({
            email:check.email,
            password:check.password
        },KEY)
        res.json({status:"signed in successfully",user:token})
    }

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
