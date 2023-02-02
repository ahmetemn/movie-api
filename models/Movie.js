const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const MovieSchema= new Schema({
    ///bu data object Id şeklinde tutulması gerekiyor.
    director_id:Schema.Types.ObjectId,
        title:{
            type:String,
            required:[true , '`{PATH}` required area'],     
            maxlength:[150 , '`{PATH}`max 150 character'],
            minlength:[2, '`{PATH}` min 1 character']

        }, 
            category: String,
            country:String,
            year:Number,
            imdb_score:Number,
            createdAt: {
                type:Date,
                default:Date.now
            }
                        
});

module.exports=mongoose.model('movie' , MovieSchema);
