const jwt=require('jsonwebtoken');
const database=require('../database/db')
/*module.exports.checktoken=function checktoken(req,res,next){
    console.log("middleware is working");
    const token=req.headers["authorization"];
    console.log(token);
    if(token){
         jwt.verify(token,"secert_key",function(err,decode){
              if(err){
                   res.status(401).send({message:" access denied"});
                   return;
              }
              else{
                /*res.send({
                    result:decode
                    
               });*/
               /*console.log(decode.id);
               req.id=decode.id;
                //req.user=decode.user;
               next();
               
              } 
              
         });
    }
    else{
         res.send({
              message:"enter the token"
         });
    }
}*/
module.exports.check=async function(req,res){
    console.log("this is main function");
    console.log(req.id);
    var authid=req.id;
    let [result]=await database.promise().query(`select*from user where id="${authid}"`);
    console.log(result[0]);
    res.send(result[0]);
     
}

