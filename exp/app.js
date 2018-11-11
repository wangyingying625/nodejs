//加载模块
var path=require('path');
var express=require('express');
var app=express();
//处理静态资源的方法
app.get('/',function (req,res) {
    //重定向
    //res.redirect('../news/index.html');
    //读取文件
    res.sendFile(path.join(__dirname,'/static','001.jpg'),function (err) {
        if(err)
        {
            throw err;
        }
    })
});
//apache配路由
app.use('/',express.static(path.join(__dirname,'static')));
app.listen(3032,function () {
    console.log('apache');
})

