var express = require('express');
const bodyParser =require('body-parser');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
var hashpass;
var nodemailer=require('nodemailer');
var bloog=' ';
var em=' ';
const exphbs=require('express-handlebars');
 
 

var d = new Date().toString();


var res = d.split(" ");
var x=parseInt(res[3]);
 



//email
var transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
       user:'blooddonorsystem123@gmail.com',
       pass:'Project@1234'
     }
});


 require('../models/signup');
var Signup=mongoose.model('Signup');
var Login=require('../models/login');
Login=mongoose.model('Login');
 

var signupRouter  = express.Router();
signupRouter.use(bodyParser.json());

signupRouter.get('/',(req,res)=>{
    res.render('employee/signup');
   
});
 


 
 signupRouter.post('/',async (req,res)=>{
    var password=req.body.password;
    var newpass=req.body.newpass;
    var emailId=req.body.email;
    var mobile=req.body.mobile;
    var name=req.body.name;
    var da=req.body.dob;
    var day=da.split("-");
    var y=parseInt(day[0]);
    var age=x-y;
    console.log(age);

  bloog=req.body.blood;
    
    

    var mailOptions={

        from:'blooddonorsystem123@gmail.com',
        to:emailId,
        subject:'Sending mail by BloodDonate System',
        text:`You are registered to the Blood Donor System with Name:${name} mobile number :${mobile} BloodGroup:${req.body.blood} Address:${req.body.address} `
    };
     
   
      
 if(req.body.password==null||req.body.name==null||req.body.mobile==null||req.body.email==null){
     res.statusCode=201;
     res.redirect('/signup');
 }
 
 else{
     
      
      
    
    if(password===newpass  )
    {
        
      try{ 
          const salt=await bcrypt.genSalt();
       hashpass=await bcrypt.hash(password,salt);
       req.body.password=hashpass;
      
      
      Signup.findOne({email:req.body.email})
      .then((resp)=>{
          if(resp!=null)
          {
              res.redirect('/signup');
          }
          else
          {
                
     insert(req,res);
     transporter.sendMail(mailOptions,function(error,info){
       if(error)
       {
           console.log("Email not sent ");
       }else{
           console.log('Email sent');
       }
       
       });

       var details=new Signup();
       details.name=req.body.name;
       details.gender=req.body.gender;
       details.blood=req.body.blood;
       details.mobile=req.body.mobile;
       details.email=req.body.email;
       details.dob=req.body.dob;
       details.address=req.body.address;
       details.password=hashpass;
       details.age=age;
       details.save()
      .then((de) => {
           res.statusCode = 200;
           res.setHeader("Content-Type", "application/json");
           console.log("data stored");
           
          

       }, (err) => next(err))
       .catch((err) => {
           res.statusCode=404;
           res.send("Unsuccess");
       });


          }

      })
 
    
        
    }
    catch{
        res.statusCode=500;

    }
    }//end if
   else
   {
       console.log("Password not matched");  
    } 
 }});

 

    

 


 function insert(req,res)
 {
     var details=new Login();
     details.email=req.body.email;
     details.password=hashpass;
     details.save();
 }
  
   

    
 
 
module.exports=signupRouter;