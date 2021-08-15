const express=require('express');

const router=express.Router();

module.exports=router;

const userController=require('../controllers/user.controller');

const auth=require('../authen/aunthentication');

const log=require('../authen/middleware');

router.get("/findall",userController.findAll);

router.post("/create",userController.create);

router.post("/login",userController.getLogin);

router.use("/data",log.checktoken);

router.get("/data",auth.check);

router.delete("/delete/:id",userController.delete);

router.put("/update/:id",userController.update);