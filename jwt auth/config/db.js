const mongoose=require('mongoose')

async function db(){
    try{
     await mongoose.connect(process.env.DBURL);
     console.log('connected')
    }
    catch(err){
        console.error(err)
    }
}

module.exports=db;