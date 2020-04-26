const mongoose=require('mongoose');

var  hosdataSchema=new mongoose.Schema({
    hname:{
        type:String,
         
         
    },
    regno:{
        type:String,
        
    } 


});


mongoose.model('HospitalData',hosdataSchema);