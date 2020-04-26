var express = require('express');
 const bcrypt=require('bcrypt');
const bodyParser =require('body-parser');
const mongoose=require('mongoose');
 const jwt=require('jsonwebtoken');
  
flag=0;
 require('../models/adminlogin');
 var Adminlogin=mongoose.model('AdminLogin');
 

var adminloginRouter  = express.Router();
adminloginRouter.use(bodyParser.json());

adminloginRouter.get('/',(req,res)=>{
    res.render('admin/adminlogin');

});

adminloginRouter.post('/',(req,res)=>{
    userna=req.body.email;
    const email=req.body.email;
    const user={name:email}
     Adminlogin.findOne({email:userna})
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
                                                     
                         
                         
                        flag=11;
                         res.redirect('/admin');
                            
                       }
                       else{
                           res.statusCode=404;
                           console.log("not authenticate");
                           res.send("Login Failed");
                            
                       } });
                   

               }catch{
                   res.statusCode=500;
               }
          }
      
          
 
    },(err)=>next(err)).catch((err)=>next(err));
   

  




});
 



module.exports=adminloginRouter;