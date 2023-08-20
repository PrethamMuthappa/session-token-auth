const express=require('express');
const path=require('path');
const app=express();
const dotenv=require('dotenv');
const bcrypt=require('bcrypt');
const cookieparser=require('cookie-parser')
const jwt=require('jsonwebtoken');
app.set('views',path.join(__dirname , 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const usermodel=require('../model/user')
const router=express.Router();
app.use(cookieparser());
dotenv.config();



router.post('/login',async(req,res)=>{
    try{
    const {email,password}=req.body;
   const user= await usermodel.findOne({email})

   if(!user){
    res.status(505).send('usere not found')
   }
   
   
    
     bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
         
          async function tokenCreation (){

            
            
           const payload={

            user:req.body.email,
            roles:['normaluser']
           }

          const secreatekey=process.env.SECRETE_KEY;

          const myid= jwt.sign({payload},secreatekey,{expiresIn:'30m'})
        
          res.cookie('ids',myid,
          {expires:new Date(Date.now()+3600*1000),
            httpOnly:true,
            sameSite:true,
            secure:true
          })

          // create a referesh token 

          const reftoken=process.env.REFRESH

          const newpayload={

            user:req.body.email,
            roles:['normaluser']
          }

          const refersh=jwt.sign({newpayload}, reftoken,{expiresIn:"50d"})

          res.cookie('ref',refersh,{
            expires:new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
            httpOnly:true,
            sameSite:true,
            secure:true

          })

                        
          }
          tokenCreation();

            res.redirect('/special')
         
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
