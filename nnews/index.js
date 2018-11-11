var http=require('http');
var cont=require('./content.js');
var router=require('./router');
var config=require('./config.js');
http.createServer(function (req,res) {
    router(req,res);
}).listen(config.port,function () {
    console.log('ok');
});
