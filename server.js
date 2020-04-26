require('./models/connect');
 

const express=require('express');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');
const path=require('path');
const mongoose=require('mongoose');

//routes
const loginRouter=require('./routes/loginRouter');
const signupRouter=require('./routes/signupRouter');
const seekerRouter=require('./routes/seekerRouter');
const adminRouter=require('./routes/adminRouter');
const adminloginRouter=require('./routes/adminloginRouter');
 

//models
require('./models/signup');
var Signup=mongoose.model('Signup');
var Login=require('./models/login');
Login=mongoose.model('Login');
const HData=require('./models/hosdata');

require('./models/compaign');
const Compaign = mongoose.model('Compaign');
 
var app=express();

app.use(bodyparser.json());
//will not shown in search bar
app.use(bodyparser.urlencoded({
    extended:true
    }));


    //setting up frontend
    app.set('views',path.join(__dirname,'/views/'));
    app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutDir:__dirname+'/views/layouts/'}));
    app.set('view engine','hbs');


app.listen(3000,()=>{
    console.log("Server Started");

});

app.get('/',(req,res)=>{
    res.render('employee/home');
   
});
 
app.get('/profile',(req,res)=>{
    if(flag==1){
    Signup.findOne({email:userna}).lean()
    .then((result)=>{
        
        res.render('employee/profile',{
            list:result
        });
       
    },(err)=>next(err))
    .catch((err)=>next(err));}
    else{
        res.redirect('/login');
    }
   

    
    });


    app.post('/profile',(req,res)=>{
        if(flag==1)
        {
         var query={email:userna}
         var item={
           $set:{ name:req.body.name,
            address:req.body.address,
            blood:req.body.blood,
            mobile:req.body.mobile
           }
            };
       Signup.updateOne( query,item,function(err,result){
           if(err) throw err; 
       });   }
       else{
        res.redirect('/login');

       }
       
    });


    
    app.get('/compaign', (req, res)=>{
        if(flag==1)
	{
        var date = new Date();
        var currentday = date.getDate();
        var currentyear = date.getFullYear();
        var currentmonth = date.getMonth();
        Compaign.find().lean().then((result) => {
                    
                    for(var i=0;i<result.length;i++){
                             var temp = new Date(result[i].dateto);
                             var temp_day = temp.getDate();
                             var temp_month = temp.getMonth()+1;
                             var temp_year = temp.getFullYear();
    
                             if(date > temp || temp_month==currentmonth){
                                 result.splice(i, 1);
                             }
                       }
    
                    res.render("admin/compaign", {
                        
                        
    
    
    
                        list: result
                    });
                    
                    console.log("this is", result);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else{
        res.redirect('/login');
    }
    });
    
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/seeker',seekerRouter);
app.use('/admin',adminRouter);
app.use('/adminlogin',adminloginRouter);
 
 