const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
module.exports=() =>{

    mongoose.connect('mongodb+srv://ahmetemn:ahmetgs123A@apimovie.ivag3pe.mongodb.net/test')

    mongoose.connection.on('open' , () =>{
        console.log('MongoDb Connected')
    })


    mongoose.connection.on('error' , (err) =>{


        console.log('MongoDb :Error' , err)
    })
}