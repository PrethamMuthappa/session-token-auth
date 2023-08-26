const express=require('express');
const app=express();
app.use(express.urlencoded({extended:true}))
const cookieparser=require('cookie-parser');
app.use(express.json())
app.use(cookieparser())
const id=require('../model/session')


const auths=async(req,res,next)=>{

    const sessiontoken=req.cookies.id;

    if(!sessiontoken){
       return res.redirect('/')
    }

    const seshtoken= await id.findOne({token:sessiontoken})
    if(!seshtoken){
        return res.send('session not found');
    }

    currentexpiry=new Date();

    if(seshtoken.expiry<currentexpiry){
        
        await id.deleteOne({token:sessiontoken})
        return res.status(401).send('Session expired');
    }

    next()    
}

module.exports=auths;