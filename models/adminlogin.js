const mongoose=require('mongoose');

var adminloginSchema=new mongoose.Schema({
    email:{
        type:String,
         
         
    },
    password:{
        type:String,
        
    } 


});


mongoose.model('AdminLogin',adminloginSchema);