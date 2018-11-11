var _=require('underscore');
//template模板替换方法
var html='<h2><%= name %></h2>';
var fn=_.template(html);
var html=fn({name:222});
console.log(html);