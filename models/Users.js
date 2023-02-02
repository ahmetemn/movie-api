const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema=new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        maxLength:150,
        minLength:2,

    },
    password:{
        type:String,
        maxLength:150,
        minLength:[8 , '`{PATH}` Min 8 character']
    }


})

module.exports=mongoose.model('user' ,UserSchema )