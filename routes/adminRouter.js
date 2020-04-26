require('./adminloginRouter');
 
var express = require('express');
const bcrypt=require('bcrypt');
const bodyParser =require('body-parser');
const mongoose=require('mongoose');
require('./adminloginRouter');
var adminRouter  = express.Router();
adminRouter.use(bodyParser.json());
require('../models/compaign');

const Compaign = mongoose.model('Compaign');
adminRouter.get('/', (req,res)=>{
	if(flag==11)
     
   { res.render('admin/adminpage');}
   else{
	res.redirect('adminlogin');
   }

});


adminRouter.get('/create' ,(req,res)=>{
if(flag==11)
{
	res.render('admin/create');}
	else{
		res.redirect('adminlogin');
	}
});

adminRouter.post('/create', (req, res)=> {
	if(flag==11)
	{
	create(req, res);}
	else
	{
		res.redirect('adminlogin');
	}
});

function create(req, res){
	var compaign = new Compaign();
	compaign.location = req.body.location;
	compaign.datefrom = req.body.datefrom;
	compaign.dateto = req.body.dateto;
	compaign.helpline = req.body.helpline;
	compaign.save((err, doc) => {
		if(err) 	console.log(err);

		console.log(doc);
		res.render("admin/create");
		
	});
}








module.exports=adminRouter;