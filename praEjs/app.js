var ejs=require('ejs');
var path=require('path');
//1
var html='<h1><%=username %></h1>';
ejs.render(html,{username:'wmm'});

//2(需要文件index.html)
ejs.renderFile(path.join(__dirname,'index.html'),{title:'this is a title',msg:'hello'},function (err,result) {
    console.log(result);
});