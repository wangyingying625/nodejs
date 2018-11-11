var url=require('url');
var fs=require('fs');
var _=require('underscore');
var mime=require('mime');
module.exports=function  (req,res) {
    req.method=req.method.toLowerCase();
    res.render=function(path,tplData) {
        fs.readFile(path,function(err,data) {
            if(err)
            {
                console.log('fail');
                throw err;
            }
            if(tplData)
            {
                var fn= _.template(data.toString('utf8'));
                data = fn(tplData);
            }
            //console.log(path);
            res.setHeader('Content-Type',mime.getType(path));
            res.end(data);
        });
    };


    var urlObj=url.parse(req.url.toLowerCase(),true);
    req.query=urlObj.query;
    req.pathname=urlObj.pathname;
}