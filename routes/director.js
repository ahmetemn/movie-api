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



router.get('/' , (req , res )=>{
    const promise = Director.find({});
    promise.then((data) =>{
        res.json(data)
    }).catch((data)=>{
        res.json(data)
    })
})
module.exports=router