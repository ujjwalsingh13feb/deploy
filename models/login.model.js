const mongoose =require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:String
},{
    versionKey:false,
})

const userModel=mongoose.model('User',userSchema )

module.exports ={
    userModel
}