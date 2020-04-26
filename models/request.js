const mongoose=require('mongoose');

var requestSchema=new mongoose.Schema({
    hname:{
        type:String,
         
         
    },
    blood:{
        type:String,
        
    } ,
    pname:{
        type:String
    },
    age:{
        type:String

    },
    reason:{
        type:String
    }


});


mongoose.model('RequestData',requestSchema);