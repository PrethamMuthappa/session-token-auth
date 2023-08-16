const express=require('express');
const mongoose=require('mongoose');
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
async function main(){
 try{

 
    await db()
   
    app.get('/',(req,res)=>{
      res.render('index')
    })

    app.get('/signejs',(reqq,res)=>{
      res.render('signup')
    })
   
    app.get('/loginejs',(req,res)=>{
      res.render('login')
    })
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