const express=require('express');
const path=require('path');
const app=express();
const bcrypt=require('bcrypt');
app.set('views',path.join(__dirname , 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const signup=require('../routes/signup')
const usermodel=require('../model/user')
const router=express.Router();

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
   const user= await usermodel.findOne({email})
   if(!user){
    res.status(505).send('usere not found')
   }
   
   try{
    
    await bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            res.send('done')
        }
        else{
            res.send('nope')
        }
    })
   }
   catch(err){
    console.log(err)
   }

    

})

module.exports=router;
