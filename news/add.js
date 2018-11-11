var http=require('http');
var fs=require('fs');
var mime=require('mime');
var path=require('path');
var url=require('url');
var querystring=require('querystring');
var _=require('underscore');
http.createServer(function (req,res) {
    req.url=req.url.toLowerCase();
    var urlObj=url.parse(req.url,true);
    req.method=req.method.toLowerCase();
    res.render=function(url,tplData) {

        fs.readFile(path.join(__dirname,url),function(err,data) {
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
            res.setHeader('Content-Type',mime.getType(url));
            res.end(data);
        });
    };


    if(req.url=='/'||req.url=='/index.html'&&req.method=='get')
    {
        readF(function (lists) {
            res.render('index.html',{list: lists});
        });
        console.log(req.url.pathname);
       }







    else if(req.url.startsWith('/add')&&req.method=='get')
    {
        fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',function (err,data) {
             if(err && err.code!='ENOENT'){
                 throw err;
             }
             var list=JSON.parse(data||'[]');
             urlObj.query.id=list.length;
            list.push(urlObj.query);
            fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function (err) {
                if(err)
                {
                    throw err;
                }
                else {

                    console.log("json ok");
                    res.statusCode=302;
                    res.statusMessage='Found';
                    res.setHeader('Location','/');
                    res.end();
                }
            });

        });
    }
    else  if(req.url.startsWith('/add')&&req.method=='post')
    {
        fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',function (err,data) {
            if(err && err.code!='ENOENT')
                throw err;
            else {
                var list=JSON.parse(data||'[]');
            }
            var array=[];
            req.on('data',function (chunk) {
                array.push(chunk);
            });
            req.on('end',function () {
               var postBuffer=Buffer.concat(array);
               postBuffer=postBuffer.toString('utf-8');
               postBuffer=querystring.parse(postBuffer);
               postBuffer.id=list.length;
               list.push(postBuffer);
                fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function (err) {
                    if(err)
                    {
                        throw err;
                    }
                    else {

                        console.log("json ok");
                        res.statusCode=302;
                        res.statusMessage='Found';
                        res.setHeader('Location','/');
                        res.end();
                    }
                });
            })
        })
    }
    else if(req.url.startsWith('/static')&&req.method=='get')
    {
        res.render(req.url);
    }


    else if(urlObj.pathname==='/item'&&req.method=='get')
    {

        fs.readFile(path.join(__dirname,'data','data.json'),function (err,data) {
            if(err && err.code!='ENOENT')
                throw err;
            else
            {
                var lists=JSON.parse(data||'[]');
                for(var i=0;i<lists.length;i++)
                {
                    if(urlObj.query.id===lists[i].id.toString())
                    {
                        var list_item=lists[i];
                        console.log(req.url);
                        console.log(urlObj.query.id);
                        console.log(lists[i].id);
                        res.render('/item.html',{item:list_item});
                    }
                }
            }

        });
    }




    else
       {
           console.log(req.url);
        console.log(req.url.startsWith('/add'));
        console.log(req.method);
        console.log(req.method=='get');
        res.end('404235');
       }
}).listen(3032,function () {
    console.log("ok");
})


//读文件方法
function readF(callback) {
    fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',function (err,data) {
        if(err && err.code!='ENOENT'){
            throw err;
        }
        var list=JSON.parse(data||'[]');
        callback(list);
    });
}
//写文件方法

function writeF(data,callback) {
    fs.writeFile(path.join(__dirname,'data','data.json'),data,function (err) {
        if(err)
        {
            throw err;
        }
        callback();
     });
}

//获取用户post提交的数据
function post(req,callback) {
    var array=[];
    req.on('data',function (chunk) {
        array.push(chunk);
    });
    req.on('end',function () {
        var postBuffer = Buffer.concat(array);
        postBuffer = postBuffer.toString('utf-8');
        postBuffer = querystring.parse(postBuffer);
        callback(postBuffer);
    });
}
