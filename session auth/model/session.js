const mongoose=require('mongoose')
const{Schema,model}=mongoose

const sesh=new Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },

    expiry:{
        type:Date,
        required:true,
    }
},{versionKey:false})

const tokens=new model('mytoken',sesh);

module.exports=tokens;