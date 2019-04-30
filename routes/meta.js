const router = require('express').Router();

router.get('/',(req,res)=>{
    res.json({
        say:'Welcome to my blog',
        title: '我的博客'
    })
})

router.get('/blog',(req,res)=>{
    res.json({
        title:'博客列表'
    })
})

module.exports = router