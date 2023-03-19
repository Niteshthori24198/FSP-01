const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    username:{type:String , required:true},
    email:{type:String, required:true},
    dob:{type:Date , required:true},
    role:{type:String, required:true},
    location:{type:String , required:true},
    password:{type:String , required: true}


},

    {versionKey:false}

)



const UserModel = mongoose.model("user",userSchema);


module.exports = {
    UserModel
}