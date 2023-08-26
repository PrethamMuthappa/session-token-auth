const express=require('express');
const path=require('path');
const app=express();
const cookieparser=require('cookie-parser')
app.set('views',path.join(__dirname , 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const router=express.Router();
app.use(cookieparser());
const mongoose=require('mongoose')
const session=require('../model/session')

router.get('/logout',async(req,res)=>{
    const mycook=req.cookies.id;
    console.log(mycook)
   if(!mycook){
    res.status(500).send("no cookie found log out sucessful");
   }
   else{
    await session.deleteOne({'token':mycook})
    res.clearCookie('id',mycook);
    res.redirect('/')
   }
    
})
module.exports=router;