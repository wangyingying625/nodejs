
var fs=require('fs');
var path=require('path');
var querystring=require('querystring');
module.exports.index=function (req,res) {
    console.log('index了');
    readF(function (lists) {
        res.render(path.join(__dirname,'index.html'),{list: lists});
    });
};
module.exports.add=function (req,res) {
    console.log('add了get');
    readF(function (list) {
        req.query.id = list.length;
        list.push(req.query);
        writeF(JSON.stringify(list),function () {
            console.log("json ok");
            res.statusCode = 302;
            res.statusMessage = 'Found';
            res.setHeader('Location', '/');
            res.end();
        });
    });
};
module.exports.addPost=function (req,res) {
    console.log('add了post');
    readF(function (list) {
        post(req,function (postBuffer) {
            postBuffer.id=list.length;
            list.push(postBuffer);
            writeF(JSON.stringify(list),function () {
                console.log("json ok");
                res.statusCode=302;
                res.statusMessage='Found';
                res.setHeader('Location','/');
                res.end();
            })
        })
    })
};
module.exports.static=function (req,res) {
    console.log('static了');
    res.render(path.join(__dirname,req.url));
};
module.exports.item=function (req,res) {
    console.log('item了');
    readF(function (lists) {
        for(var i=0;i<lists.length;i++)
        {
            if(req.query.id===lists[i].id.toString())
            {
                var list_item=lists[i];
                res.render(path.join(__dirname,'./item.html'),{item:list_item});
            }
        }
    })
};
module.exports.else=function (req,res) {
    console.log(req.url);
    console.log(req.method);
    res.end('404235');
};
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