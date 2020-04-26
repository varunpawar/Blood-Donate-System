const mongoose=require('mongoose');
const Url='mongodb://localhost:27017/EmployyDb';
mongoose.connect(Url,{useNewUrlParser:true},(err)=>{
    if(!err)
    {   
        console.log('Database Connected');
    }
    else{
        console.log('Database is not connected');
    }

});

 