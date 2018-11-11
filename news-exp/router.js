//方法1：（不安全）
/*
module.exports=function (app) {
    app.get('/',function (res,req) {

    });
    app.get('/index',function (req,res) {

    });

    app.get('/add',function (req,res) {

    });
    app.post('/add',function (req,res) {

    });
    app.get('/item',function (req,res) {

    });
}*/
//方法2
var express=require('express');
var router=express.router;
var handler=require('./handler.js');
router.get('/',handler.index);
router.get('/index',handler.index);

router.get('/add',function (req,res) {

});
router.use('/static',express.static(path.join(__dirname,'static')));
router.post('/add',function (req,res) {

});
router.get('/item',function (req,res) {

});
module.exports=router;
