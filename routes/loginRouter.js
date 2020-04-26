var express = require('express');
 const bcrypt=require('bcrypt');
const bodyParser =require('body-parser');
const mongoose=require('mongoose');
flag=0;
 

 require('../models/login');
 var Login=mongoose.model('Login');
 

var loginRouter  = express.Router();
loginRouter.use(bodyParser.json());

loginRouter.get('/',(req,res)=>{
    res.render('employee/login');
   
});

loginRouter.post('/',async (req,res)=>{
     userna=req.body.email;
      Login.findOne({email:userna})
      .then((user)=>{
            if(user==null)
            {
                console.log('Not Found');
            }
            else{
                 try{
                       bcrypt.compare(req.body.password,user.password,function(err,resp){
                         if(err)
                         {
                             res.statusCode=500;
                         }
                         if(resp)
                         {
                             console.log("authenticate");
                             flag=1;
                              
                             res.redirect('/');
                               
                         }
                         else{
                             res.statusCode=404;
                             console.log("not authenticate");
                             res.send("Login Failed");
                              
                         }

                     });
                     

                 }catch{
                     res.statusCode=500;
                 }
            }
        
            
   
      },(err)=>next(err)).catch((err)=>next(err));
     
  
    
  
 
});

module.exports=loginRouter;