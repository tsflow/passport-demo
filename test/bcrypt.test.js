const bcrypt = require("bcrypt");
bcrypt.genSalt(20,(err,salt)=>{
  console.log(salt);
})
