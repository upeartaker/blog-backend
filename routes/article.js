const router = require('express').Router();
const model = require('../model/articleModel.js');

router.post('/save',(req,res,next)=>{
    if(req.session.info){
        model.create({
            uid:req.session.info.uid,
            details:req.body.details
        },(err,info)=>{
            if(!err){
                res.json({
                    state:true,
                    code:1,
                    message:'保存成功'
                })
            }
        })
    }else{
        res.json({
            state:false,
            code:0,
            message:'用户未登录'
        })
    }
})

module.exports = router