var express=require('express');
var app=express();
//注册路由
app.get('/',function (req,res) {
    //res.end('hello');
    res.send("hello");
});
//任何方式的请求都可以，并且请求路径只需第一部分是/index
app.use('/index',function (req,res) {

});


app.get('/add',function (req,res) {

});
//通过app。params获取路由中参数
app.get('/add/:year/:month/:day',function (req,res) {
    res.send(req.params);
});
app.post('/add',function (req,res) {

});

app.get('/item',function (req,res) {
    //res.end('hello');
    res.send("index");
});
app.listen(3032,function () {
    console.log('app');
})