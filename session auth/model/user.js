const mongoose=require('mongoose')
const{Schema,Model}=mongoose

const userschema=new Schema({
    name:String,
    email:String,
    password:String,
})