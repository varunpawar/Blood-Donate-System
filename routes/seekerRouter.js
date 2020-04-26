var express=require('express');
const bodyParser =require('body-parser');
const mongoose=require('mongoose');
require('../models/signup');
var Signup=mongoose.model('Signup');
var bloog=' ';

var seekerRouter  = express.Router();
seekerRouter.use(bodyParser.json());
require('../models/request');
var Req=mongoose.model('RequestData');
 


 require('../models/hosdata');
var HData=mongoose.model('HospitalData');



seekerRouter.get('/',(req,res)=>{
    res.render('seeker/find');
   
});

seekerRouter.post('/',(req,res)=>{
  bloog=req.body.blood;
    
          HData.find({hreg:req.body.regno})
          .then((resp)=>{
              if(resp!=null)
          {
              res.redirect('seeker/list');
          }

            console.log(resp);
          },(err)=>next(err))
          .catch((err)=>next(err))
           

             
   
});

seekerRouter.get('/list',(req,res)=>{
    Signup.find({blood:bloog}).lean()
    .then((result)=>{
    console.log(result);
        res.render('seeker/list',{
            list:result
        });
        
    },(err)=>next(err))
    .catch((err)=>next(err));
   

    
    });
module.exports=seekerRouter;

