/*生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use('/', routes); 加载。
这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中。*/
//修改的写法
var User = require('../models/User.js');
module.exports = function(app){
	var responseData;
	app.use(function (req,res,next){
	  responseData = {
	    code: 0,
	    message: ''
	  };
	  next();
	})
	app.get('/', function(req, res, next) {
		res.render('index',{ title: '首页'});
	});
	app.get('/reg', function(req, res) {
		res.render('reg',{ title: '注册'});
	});
	app.post('/reg', function(req, res) {
		//注册的逻辑
		var username = req.body.username;
		var password = req.body.password;
		var repassword = req.body.repassword;
		console.log(password);
		console.log(repassword);
		// 用户名是否为空
		if(username == '') {
			responseData.code = 1;
			responseData.message = '用户名不能为空';
			res.json(responseData);
			return;
		}
		// 密码不能为空
		if(password == '') {
			responseData.code = 2;
			responseData.message = '密码不能为空';
			res.json(responseData);
			return;
		}
		//两次输入的密码必须一直
		if(password != repassword) {
			responseData.code = 3;
			responseData.message = '两次的密码输入不一致';
			res.json(responseData);
			return;
		}
		//数据库用户名是否被注册
		User.findOne({
			username: username
		}).then(function(userInfo) {
			console.log(userInfo);
			if(userInfo) {
				//表示数据库有该用户
				responseData.code = 4;
				responseData.message = '用户名已经被注册了';
				res.json(responseData);
				return;
			}
			//保存用户注册的信息倒数据库中
			var user = new User({
				username: username,
				password: password
			});
			return user.save();

		}).then(function(newUserInfo) {
			responseData.message = '注册成功';
			res.json(responseData);
		})
		

	});
	app.get('/login', function(req, res) {
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
