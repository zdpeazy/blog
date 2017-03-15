/*生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use('/', routes); 加载。
这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中。*/
/*var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/
//修改的写法
module.exports = function(app){
	app.get('/', function(req, res, next) {
		res.render('index',{ title: '首页'});
	});
	app.get('/leg', function(req, res) {
		res.render('leg',{ title: '注册'});
	});
	app.post('/leg', function(req, res) {
	});
	app.post('/login', function(req, res) {
		res.render('login',{ title: '登陆'});
	});
	app.post('/login', function(req, res) {

	});
	app.get('/post', function(req, res) {
		res.render('post',{ title: '发表'});
	});
	app.post('/post', function(req, res) {

	});
	app.get('/logout', function (req, res) {
 	});
};
