var http=require('http');
var fs=require('fs');
var mime=require('mime');
var path=require('path');
http.createServer(function (req,res) {
    res.render=function(url) {
        fs.readFile(path.join(__dirname,url),function(err,data) {
            if(err)
            {
                throw err;
            }
            res.setHeader('Content-Type',mime.getType(url));
            res.end(data);
        })}
    if(req.url=='/'||req.url=='/index.html'&&req.method=='get')
        res.render('index.html');
    else
        res.render(req.url);
}).listen(3032,function () {
    console.log("ok");
})