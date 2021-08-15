const jwt=require('jsonwebtoken');
//const database=require('./database/db')
module.exports.checktoken=function checktoken(req,res,next){
    console.log("middleware is working");
    const token=req.headers["authorization"];
    //const {token}=req.body;
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
               console.log(decode.id);
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
}