var http=require('http');
var fs=require('fs');
var path=require('path');
var url=require('url');
var mime=require('mime');
http.createServer(function (req,res) {
    req.url=req.url.toLowerCase();
    req.method=req.method.toLowerCase();
    res.render=function(url) {
        fs.readFile(path.join(__dirname,url),function(err,data) {
            if(err)
            {
                throw err;
            }
            res.setHeader('Content-Type',mime.getType(url));
            res.end(data);
        })};


    if(req.url=='/'||req.url=='/index.html'&&req.method=='get')
    {res.render('index.html');}



    else  if(req.url.startsWith('/001')&&req.method=='post')
    {
        console.log("file");
    }
    else
    {
        console.log(req.url);
        console.log(req.url.startsWith('/add'));
        console.log(req.method);
        console.log(req.method=='get');
        res.end('404235');
    }
}).listen(3030,function () {
    console.log("over");
})