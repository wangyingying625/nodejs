var http=require('http');
var serve=http.createServer();
// 监听用户的请求事件
serve.on('request',function (req,res) {
    res.setHeader('Content-type','text/plain;charset=utf-8');
    res.write('mldwyy美丽');
    res.end();
});
serve.listen(3000,function () {

})