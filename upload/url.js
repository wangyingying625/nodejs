var http=require('http');
var url=require('url');
http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);
    req.url=req.url.toLowerCase();
    req.method=req.method.toLowerCase();
    console.log(urlObj.pathname);
    res.end(req.url);
}).listen(3030,function () {
    console.log("50");
})