const mongoose=require('mongoose');

var loginSchema=new mongoose.Schema({
    email:{
        type:String,
         
         
    },
    password:{
        type:String,
        
    } 


});


mongoose.model('Login',loginSchema);