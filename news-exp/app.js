var express=requrire('express');
var config=require('./config.js');
var app=express();
var router=require('./router.js');
//方法1
/*router(app);*/
//方法2
app.use('/',router);
app.listen(config.port,function () {
    console.log("news");
})