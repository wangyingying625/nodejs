var cont=require('./content.js');
var handler=require('./handler.js');
module.exports=function (req,res) {
    cont(req,res);
    if(req.url=='/'||req.url=='/index.html'&&req.method=='get')
    {
        handler.index(req,res);
    }
        else if(req.url.startsWith('/add')&&req.method=='get')
        {
            handler.add(req,res);
        }
        else  if(req.url.startsWith('/add')&&req.method=='post')
        {
            handler.addPost(req,res);
        }
    else if(req.url.startsWith('/static')&&req.method=='get')
    {
        handler.static(req,res);
    }


     else if(req.pathname==='/item'&&req.method=='get')
     {
         handler.item(req,res);
     }




     else
     {
        handler.else(req,res);
     }
};


