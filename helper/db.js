const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
module.exports=() =>{

  mongoose.connect("mongodb+srv://ahmemn1:123antares123@movieapp1.74r9g1m.mongodb.net/test")

    mongoose.connection.on('open' , () =>{
        console.log('MongoDb Connected')
    })


    mongoose.connection.on('error' , (err) =>{


        console.log('MongoDb :Error' , err)
    });

    mongoose.Promise = global.Promise;

}