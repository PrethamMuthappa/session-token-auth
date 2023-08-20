const express=require('express');
const app=express();
app.use(express.urlencoded({extended:true}))
const cookieparser=require('cookie-parser');
const jwt=require('jsonwebtoken');
app.use(express.json())
app.use(cookieparser())
const id=require('../model/jwt')

const key=process.env.SECRETE_KEY
const refkey=process.env.REFRESH


const auths=async(req,res,next)=>{
     
      const token=req.cookies.ids
      if(!token){
        return res.status(505).send('not authorizized');
      }


       jwt.verify(token,key,(err,decoded)=>{
        if(err)throw err;
        req.user=decoded;

        if(decoded.roles=='admin'){
        res.status(505).send('not admin acess')
        }

        req.user=decoded
      })
     
      next();

      // authorization for refresh token 

      const reftoken=req.cookies.ref;
      if(!reftoken){
        res.status(505).send('no ref')
      }

      jwt.verify(reftoken, refkey,(err,dec)=>{
        if(err)throw err;

       if(Date.now()>dec.exp*1000){
        res.status(401).send('token is expired')
       }

       const newaccess=jwt.sign(reftoken,refkey,{expiresIn:'25m'})

       res.cookie('ids',newaccess,{
        expires:new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        sameSite:true,
        secure:true

      })


       if(dec.roles=='admin'){
        res.status(505).send('only admin acess')
       }

        req.user=dec
    
      })



      

      next()
}



module.exports=auths;