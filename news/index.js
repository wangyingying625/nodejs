var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
http.createServer(function (req,res) {
    req.url=req.url.toLowerCase();
    req.method=req.method.toLowerCase();
    if(req.url=='/'||req.url=='/index'&&req.method=='get')
    {
        fs.readFile(path.join(__dirname,'index.html'),function(err,data) {
        if(err)
        {
            throw err;
        }
        res.end(data);
    })
    }
    else if(req.url.startsWith('/static')&&req.method=='get')
    {
        fs.readFile(path.join(__dirname,req.url),function(err,data) {
            if(err)
            {
                throw err;
            }
            res.setHeader('Content-Type',mime.getType(req.url));
            res.end(data);
        })
    }
}).listen(3033,function () {
    console.log("55");
})