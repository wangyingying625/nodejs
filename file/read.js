var re=require('fs');
var path=require('path');
var filename=path.join(__dirname,'hello.txt');
re.readFile(filename,'utf-8',function (err,data) {
    if (err){
        throw err;
    }
    else {
        console.log(data);
    }
})