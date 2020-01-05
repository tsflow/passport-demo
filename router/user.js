const express =require("express");
let router=express.Router();


router.get("/login",(req,res)=>{
  res.render("login");
})

router.get("/register",(req,res)=>{
  res.render("register");
})

router.post("/register",(req,res)=>{
  
})
module.exports =router;
