const mongoose=require('mongoose')
const{Schema,model}=mongoose

const sesh=new Schema({
    token:String
})

const tokens=new model('mytoken',sesh);

module.exports=tokens;