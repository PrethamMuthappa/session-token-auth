const { log } = require('console');
const express=require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const app=express();
app.set('views',path.join(__dirname , 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const usermodel=require('../model/user')
const router=express.Router();

router.post('/sign',async(req,res)=>{
    try{

        const{name,email,passwords}=req.body;
        
        const existinguser=await usermodel.findOne({email})
        if(existinguser){
            return res.status(505).send('email already exist')
        }

        const hashed_password=await bcrypt.hash(passwords,10);

        const userdata=new usermodel({
            name:name,
            email:email,
            password:hashed_password
        })

      await userdata.save();

      res.redirect('/loginejs')
        
    }
    catch(err)
    {
        console.error(err);
    }
})

module.exports=router;