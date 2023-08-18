const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const db=require('./config/db')
const port=process.env.PORT;
app.set('views',path.join(__dirname , 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const mysignup=require('./routes/signup')
const login=require('./routes/login')
const autho=require('./middleware/auth')
const cookieparser=require('cookie-parser');
app.use(cookieparser())
async function main(){
 try{

 
    await db()
   
    app.get('/',(req,res)=>{
      res.render('index')
    })

    app.get('/signejs',(req,res)=>{
      res.render('signup')
    })
   
    app.get('/loginejs',(req,res)=>{
      res.render('login')
    })

    app.get('/special',autho,(req,res)=>{
      res.send('heloo fuckers')
    })
    
    app.use('/',mysignup);
    app.use('/',login)

    
    app.listen(port,()=>{
      console.log('listening on ' + port )
    })

 }
 catch(err)
 {
    console.log(err)
 }
}

main()