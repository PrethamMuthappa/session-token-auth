const express=require('express');
const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const auths=(req,res,next)=>{

    const sessiontoken=req.cookie.id;

    if(!sessiontoken){
        res.send("not authorizidez")
    }

    
    
}