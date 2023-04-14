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


const ObjectId = require('mongodb').ObjectId;
const ChannelModel = require("./Data")
const finalcrop = require('./Finalcrop');

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
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"});
    }
    else{
    const {cropName, diseaseName, solution,UserName,type,image} = req.body;
      // implement schema model
    const model = new finalcrop()
    model.cropName = cropName
    model.Disease = diseaseName
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
}

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
          const token = jwd.sign({
            email: data.email,
            name: data.name,
            _id:data._id,
          }, KEY);
          res.json({ status: "signed in successfully", user: token });
        }
      });
    } else {
      const token = jwd.sign({
        email: check.email,
        name: check.name,
        _id:check._id,
      }, KEY);
      res.json({ status: "signed in successfully", user: token });
    }
  });



app.post("/signup",async (req,res)=>{
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
            const token = jwd.sign({
                email: data.email,
                name: data.name,
                _id:data._id,
              }, KEY);
              res.json({ status: "signed in successfully", user: token });
        }
    })

})




app.post("/login", async (req,res)=>{
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
            password:check.password,
            name:check.name,
            _id:check._id
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
            _id:check._id,
            name:check.name
        },KEY)
        res.json({status:"signed in successfully",user:token})
    }

})


const middleware=(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        res.send({"error":"authorization is required"})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwd.verify(token,KEY)
        next()
    }
    catch(err){
        res.send({"error":"token is required"})
    }
    
}


app.get("/userinput", middleware, async (req, res) => {
    const { cropName } = req.query;
    if(cropName){
    const data1 = await finalcrop.find({
      cropName: { $regex: new RegExp(`^${cropName}`, "i") },
    });
    res.send(data1);
  }
  else{
    res.json({"error":"please provide data"})
  }
  });

app.put("/image/:id",middleware, async (req, res) => {
    const {image} = req.body;
    const id=req.params.id;
    const isValidObjectId = ObjectId.isValid(id);
    if (!isValidObjectId) {
      return res.status(400).send('Invalid ObjectId');
    }
    else{
    const data = await finalcrop.findByIdAndUpdate(id,{image:image},{new:true});
    res.send(data);
    }
  });


  app.get('/data/:id',middleware, async(req,res)=>{
    const id = req.params.id;
    const data= await finalcrop.find({_id:id});
    res.json({"data":data});
  })


  app.post('/comment/:id',middleware, async (req,res)=>{
        const {comment}= req.body;
        const id=req.params.id;
        const isValidObjectId = ObjectId.isValid(id);
        try{
            if(isValidObjectId){
                const data = await finalcrop.findByIdAndUpdate(id,{
                    $push:{
                      comment:{
                        data:comment,
                        user:id,
                        }
                    }
                },{new:true});
                res.send(data);
            }
        }catch(err){
            console.log(err)
        }
        if (!isValidObjectId) {
          return res.status(400).send('Invalid ObjectId');
        }
        

  })
 