var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime-types');

http.createServer(function (req,res) {
    console.log(req.url);
    var publicDir=path.join(__dirname,'static');
    var fileName=path.join(publicDir,req.url);
    fs.readFile(fileName,function (err,data) {
        if(err){
            res.end("404"+err);
        }
        else {
            res.setHeader('Content-type',mime.lookup(fileName));
            res.end(data);
        }
    })

}).listen(3031,function () {
    console.log("ok");
})