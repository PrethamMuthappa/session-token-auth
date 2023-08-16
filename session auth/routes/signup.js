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

