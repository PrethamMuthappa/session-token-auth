const mongoose=require('mongoose')
const{Schema,model}=mongoose

const jwt=new Schema({
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

const tokens=new model('myjwttoken',jwt);

module.exports=tokens;