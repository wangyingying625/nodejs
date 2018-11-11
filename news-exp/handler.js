var path=require('path');
module.exports.index=function (req,res) {
    //render可模板替换,render方法默认不能使用，需要配置模板引擎
    res.render(path.join(__dirname,'index.html'));
};
module.exports.item=function (req,res) {
    res.sendFile(path.join(__dirname,'item.html'));
};
module.exports.appGet=function (req,res) {

};