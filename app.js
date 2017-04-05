var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//用body-parser处理post提交过来的数据
var kpi = require('./kpi/kpi');//调用kpi接口文件
var routers = require('./routes/route');//调用前台页面路由文件
var mainRouters = require('./routes/backend');//调用前台页面路由文件
var flash = require('connect-flash');
var session = require('express-session');  
var mongoose = require('mongoose');//加载链接数据库的中间件
var cookies = require('./cookies/cookies')//加载读取cookie的组件
var app = express();
app.set('views', path.join(__dirname, 'views'));//设置views为放置模板引擎的地方
app.set('view engine', 'ejs');//设置view的模板引擎为ejs文件
app.use(flash());
app.use(logger('dev'));//加载日志中间件
app.use(bodyParser.json());//加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: true }));//加载解析urlencoded的中间件
app.use(cookieParser());//加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));//设置pulic为放置静态文件的目录
kpi(app);//加载后台kpi接口
cookies(app);//加载读取cookie的组件
routers(app);//加载前台页面路由
mainRouters(app);//加载后台页面路由

mongoose.connect('mongodb://127.0.0.1:27017/blog',function(err){//连接本地数据库 
  if(err){
    console.log('链接数据库失败');
  }else{
    console.log('链接数据库成功');
  }
}) 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
//导出app实例供其他模块调用。
module.exports = app;
