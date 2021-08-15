const express=require('express');


const bodyParser = require('body-parser');

const app=express();

app.listen(5000,function(req,res){
    console.log("server is listening at port 5000");
});

app.get('/',function(req,res){
res.send("welcome to our website");
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

const userRoute=require('./routes/user.routes');

app.use('/user',userRoute);