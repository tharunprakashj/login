const database = require("../database/db");
//const userModels=require("../models/user.models");
const jwt=require('jsonwebtoken');
//const bcrypt=require('bcrypt');
//const {Response}=require("../response");
module.exports.findAll=function findall(req,res){
     database.query('select*from user',function(err,rows,field){
        if (err){
            throw err;
        }
        else{
             res.send(rows);
        }
     });
}
module.exports.create=async function create(req,res){
     try{
          let {name,email,password,city}=req.body;
          /*value=password;
          console.log(password);
          const salt=await bcrypt.genSalt(20);
          value=await bcrypt.hash(value,salt);
          console.log(value);*/
          let con=[];
          //console.log(req.body);
          //res.send("values are inserted");
          /*if(!name){
               res.send({
                    meassage:"enter the name"
               });
          }
          if(!email){
               res.send({
                    meassage:"enter the email"
               });
          }
          if(!password){
               res.send({
                    meassage:"enter the password"
               });
          }
          if(!city){
               res.send({
                    meassage:"enter the city"
               });
          }
          /*if (name){
               con.push(`name='${email}'`);
          }*/
          if (email){
               con.push(`email='${email}'`);
          }
          if (password){
               con.push(`password='${password}'`);
          }
          /*if (city){
               con.push(`city='${city}'`);
          }*/
          //console.log(con.length);
          if(name!="" && email!="" && password!="" && city!="" ){
          let [user]=await database.promise().query(`select name,email,city from user where ${con.join(' OR ')}`);
          if(user.length){
               res.send("you have already account");
          }
          else{
          //password=value;
          let[user]=await database.promise().query(`insert into user values(default,"${name}","${email}","${password}","${city}")`);
          res.send({
               message:"the values are inserted successfully"
          })
          }
     }
          else{
               res.send({
                    message:"enter all the details"
               });
          }
          //arr.push(a);
          //console.log(arr);
          
          
          /*if (users.insertId){
               let [user_profile]=await database.promise().query(`select id as id,name,email,city from where user where id=${users.insertId}`)
               res.send(Response._SuccessResponse("User created,user_profile"))
          }
          else{
               res.send(Response._ErrorMessage("failed to create"));
          }*/
     }
     catch(err){
          res.send(Response._ErrorMessage("failed to create user"));
     }
}
module.exports.getLogin=async function getLogin(req,res){
    // console.log("req.",req.body);
    try{
     let{email,password}=req.body;

     /*value=password;
          console.log(password);
          const salt=await bcrypt.genSalt(20);
          value=await bcrypt.hash(value,salt);
          console.log(value);*/
     
     let cond=[];

     if(!email ){
       res.send("email is required");
     }
     if(!password){
          res.send("enter the password");
     }
     if (email){
          cond.push(`email='${email}'`);
     }
     /*if (name){
          cond.push(`name='${name}'`)
     }*/
     if (password){
          cond.push(`password='${password}'`)
     }
     
     //console.log(cond);
     //res.send("values are added in array");
     
     let [user]=await database.promise().query(`select id as id,name,email,city from user where ${cond.join(' AND ')}`);
     //console.log(user);
     //console.log(user[0].id);

     if(user.length){
          let payload={
               id:user[0].id,
              /* name:user[0].name,
               email:user[0].email,
               city:user[0].city*/
          }
          var token=jwt.sign(payload,'secert_key',{expiresIn:"1h"});
          res.send({
               //message:"Login Successfull !!",
               //data:payload,
               token
          });
     }
     else{
          res.send("Login failed enter the valid username and password");
     }
}
catch(err){
     res.send(err);
}
}
module.exports.delete=function(req,res){
     var id=req.params.id;
     console.log(req.params.id);
     database.query("delete from user where id=?",[id],function(err,rows,field){
          if(err){
                 /*console.log("error:",err);
                 result(null,err)*/
                 throw err;
          }
          else{
              console.log("deleted successfully");
              res.send({message:"the values are deleted successfully"});
          }
  
      });
}
module.exports.update=function(req,res){
     var id=req.params.id;
     var {name,email,password,city}=req.body;
     //user:any={};
     console.log(req.params.id);
     database.query("update user set name=?,email=?,password=?,city=? where id=?",[name,email,password,city,id],function(err,rows,field){
          if(err){
                 /*console.log("error:",err);
                 result(null,err)*/
                 throw err;
          }
          else{
              console.log("updated successfully");
              res.send({message:"the values are updated  successfully"});
          }
  
      });
}


