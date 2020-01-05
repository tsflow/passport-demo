const express= require("express");
const expressEjsLayouts=require("express-ejs-layouts");
const mongoose =require("mongoose");
const config =require("./config");

const app=express();

//connect MongoDB

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  connectTimeoutMS:3
}).then(()=>{
  console.log("MongoDB 连接成功！");
}).catch(err=>{
  console.log(`mongodb 连接失败，失败原因${err.message}`);
})

app.use(expressEjsLayouts);
app.set("view engine","ejs");

//load Router
const userController = require("./router/user.js");
const homeController =require("./router/index.js");
app.use("/",homeController);
app.use("/user",userController);

//load static file directory
app.use(express.static("static"));

const PORT =process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log(`server is running at ${PORT}`);
})
