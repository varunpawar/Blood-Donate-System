var nodemailer=require('nodemailer');

var transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
       user:'manishbhilare12@gmail.com',
       pass:'imextreme@00777'
     }
});

 
var mailOptions={

    from:'manishbhilare12@gmail.com',
    to:toUser[i],
    subject:'Sending email using node.js',
    text:`its working`
};

transporter.sendMail(mailOptions,function(error,info){
if(error)
{
    console.log(error);
}else{
    console.log('Email sent');
}

});