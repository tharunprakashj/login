const mysql=require('mysql2');



let database=mysql.createConnection({
    host:"demo.emeetify.com",
    user:"tharun",
    password:"Skein@123",
    database:"tharun"
});

module.exports=database;