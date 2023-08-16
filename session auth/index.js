const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const db=require('./config/db.config')

async function main(){
 try{

 
    await db()
 }
 catch(err)
 {
    console.log(err)
 }
}
