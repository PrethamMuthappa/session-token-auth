const mongoose=require('mongoose')
const{Schema,model}=mongoose

const userschema=new Schema({
    name:String,
    email:String,
    password:String,
},{versionKey:false})

const userdetails=model('users',userschema)

module.exports=userdetails;