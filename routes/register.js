const express = require('express');
const router = express.Router();
const model = require('../model/userModel');    

router.post('/',(req,res,next)=>{
    let currentId = 0;
    model.find({},(err,info)=>{
        currentId = info.length + 1
    })
    model.find({
        username:req.body.username
    },(err,info)=>{
        if(!err){
            if(info.length === 0){
                model.create({
                    uid:currentId,
                    username:req.body.username,
                    password:req.body.password
                },(err,info)=>{
                    if(!err){
                        res.json({
                            state:true
                        })
                    }else{
                        res.json({
                            state:false
                        })
                    }
                })
            }else{
                console.log(info)
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