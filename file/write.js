var fs=require('fs');
var msg='Hello World';
fs.writeFile('./hello.txt',msg,'utf-8',function (err) {
    if(err){
        console.log("erroe"+err);
    }
    else {
        console.log("binggou");
    }
})