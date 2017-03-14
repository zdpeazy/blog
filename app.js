var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routers = require('./routes/index');
var settings = require('./settings');
/*var users = require('./routes/users');*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views为放置模板引擎的地方
app.set('view engine', 'ejs');//设置view的模板引擎为ejs文件

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//加载日志中间件
app.use(bodyParser.json());//加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));//加载解析urlencoded的中间件
app.use(cookieParser());//加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));//设置pulic为放置静态文件的目录

/*app.use('/', index);
app.use('/users', users);//路由控制器--把他拿到index.js里面*/
//修改后的路由的写法，将路由的组件全都放到index.js里面
routers(app);


// catch 404 and forward to error handler捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//导出app实例供其他模块调用。
module.exports = app;
