const express = require('express');
const router =express.Router();

const Director = require("../models/Director")

router.post('/' , (req,res)=>{

    const {name , surname , bio } = req.body

    const director = new Director({

        name:name,
        surname:surname,
        bio:bio
    });

    const promise= director.save();
    promise.then((data) =>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })

} )


router.get('/' , (req, res) =>{
    const promise = Director.aggregate([
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'

            }
        },

        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio',

                },
                movies:{
                    $push:'$movies'
                }
            }
        },{
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movies:'$movies'
            }
        }

    ]);

    promise.then((data) =>{
        res.json(data);
    }).catch((err)=>{
        res.json(err)
    })


});


module.exports=router