const mongoose=require('mongoose');

var signupSchema=new mongoose.Schema({
    name:{
        type:String,
        },
    gender:{
       type:String
    },
    blood:{
      type:String  
    },
    mobile:{
        type:String,
         },
    email:{
        type:String,
       },
    dob:{
        type:String

    },
    age:{
        type:String
    },
    address:{
        type:String

    },

    password:{
        type:String,
        
       
    }

});


mongoose.model('Signup'/*collection name*/,signupSchema);