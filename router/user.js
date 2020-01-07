const express =require("express");
let router=express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/login",(req,res)=>{
  res.render("login");
})

router.get("/register",(req,res)=>{
  res.render("register");
})

router.post("/register",(req,res)=>{
  let {name,email,password,password2}=req.body;
  let errors=[];
  if(!name || !password || !email || !password2){
    errors.push({
      msg:"请输入完整的信息！"
    });
  }
  if(password !== password2){
    errors.push({
      msg:"两次密码输入不一致!"
    });
  }
  if(password.length<6){
    errors.push({
      msg:"用户密码至少为6位！"
    })
  }
  if(errors.length > 0){
      res.render("register",{errors,...req.body});
  }
  else{
    User.findOne({email:email}).then(user=>{
      //用户已存在
      if(user){
        errors.push({msg:`邮箱为${email}的用户已存在！`});
        res.render("register",{errors,...req.body});
      }
      else{
        //插入新用户
        const newUser =new User({
          name:name,
          email:email,
          password:password
        });
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
            newUser.password=hash;
            console.log(newUser);
            newUser.save().then(user=>{
              res.redirect("/user/login");
            }).catch(err=>{
              console.log(err.message);
            })
          })
        })
        console.log(newUser);
      }
    }).catch(err=>{
      errors.push({msg:err.message});
      res.render("register",{errors,...req.body});
    })
  }
})
module.exports =router;
