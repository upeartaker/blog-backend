const express = require('express');
const router = express.Router();
const model = require('../model/userModel');    

router.post('/',(req,res,next)=>{
    model.find({
        username:req.body.username,
        password:req.body.password,
    },(err,info)=>{
        if(!err){
            if(info.length !== 0 ){
                req.session.info = info[0]; 
                res.json({
                    state:true
                })
            }else{
                res.json({
                    state:false
                })
            }
        }else{
            res.json({
                state:false
            })  
        }
    })
})

module.exports = router;