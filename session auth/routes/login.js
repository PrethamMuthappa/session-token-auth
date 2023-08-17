const express=require('express');
const path=require('path');
const app=express();
const bcrypt=require('bcrypt');
const cookieparser=require('cookie-parser')
const {v4 : uuidv4}=require('uuid')
app.set('views',path.join(__dirname , 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const usermodel=require('../model/user')
const id=require('../model/session')
const router=express.Router();
app.use(cookieparser());


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

            const myid= uuidv4();
            const sessionDurationInSeconds = 3600; 
            const sessionExpiry = new Date(Date.now() + sessionDurationInSeconds * 1000);


            res.cookie('id',myid,{expires:new Date(Date.now()+3600*1000),httpOnly:true})

            
            const tokens=new id({
                token:myid,
                expiry:sessionExpiry
            })

            await tokens.save()

            
          }
          tokenCreation();

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
