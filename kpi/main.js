/*kpi*/
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
	app.post('/reg', function(req, res) {
		//注册的逻辑
		var username = req.body.username;
		var password = req.body.password;
		var repassword = req.body.repassword;
		// 用户名是否为空
		if(username == '') {
			responseData.code = 1;
			responseData.message = '*用户名不能为空';
			res.json(responseData);
			return;
		}
		// 密码不能为空
		if(password == '') {
			responseData.code = 2;
			responseData.message = '*密码不能为空';
			res.json(responseData);
			return;
		}
		//两次输入的密码必须一直
		if(password != repassword) {
			responseData.code = 3;
			responseData.message = '*两次的密码输入不一致';
			res.json(responseData);
			return;
		}
		//数据库用户名是否被注册
		User.findOne({
			username: username
		}).then(function(userInfo) {
			if(userInfo) {
				//表示数据库有该用户
				responseData.code = 4;
				responseData.message = '*用户名已经被注册了';
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
			responseData.message = '*注册成功';
			res.json(responseData);
		})
		

	});
	//登录账户的逻辑
	app.post('/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		var repassword = req.body.repassword;
		// 用户名是否为空
		if(username == '' || password == '') {
			responseData.code = 1;
			responseData.message = '*用户名或密码不能为空';
			res.json(responseData);
			return;
		}
		//数据库用户名是否存在
		User.findOne({
			username:username,
			password:password,
		}).then(function(userInfo){
			if(!userInfo){
				responseData.code = 2;
				responseData.message = '*用户名或密码错误';
				res.json(responseData);
				return;
			}
			//用户名正确
			responseData.message = '*登录成功';
			responseData.userInfo = {
				_id: userInfo._id,
				username: userInfo.username,
			}
			//登录成功后设置一个cookie来保存登录状态
			res.cookie('userInfo',JSON.stringify({//注意用res来设置cookie
				_id: userInfo._id,
				username: userInfo.username,
			}));
			res.json(responseData);
			return;
		})
	});
	//修改密码的逻辑
	app.post('/changePassword', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		var newpassword = req.body.newpassword;
		if(username == '' || password == '') {
			console.log(111);
			responseData.code = 1;
			responseData.message = '用户名和原始密码不能为空';
			res.json(responseData);
			return;
		};
		if(newpassword == '') {
			responseData.code = 2;
			responseData.message = '新密码不能为空';
			res.json(responseData);
			return
		}
		//用户名正确
		if(password == newpassword) {
			responseData.code = 3;
			responseData.message = '新密码不能与旧密码相同';
			res.json(responseData);
			return;
		};
		//数据库是否存在
		User.findOne({
			username:username,
			password:password,
		}).then(function(userInfo){
			if(!userInfo){
				responseData.code = 4;
				responseData.message = '用户名或原密码错误';
				res.json(responseData);
				return;
			}
			var whereData = {username:username};
 			var updateDat = {$set: {password:newpassword}};
			User.update(whereData,updateDat,function(error, result) {
				if(error) {
					console.log('error:'+error);
				}else{
					console.log(result);
				}
			})
			responseData.message = '修改密码成功';
			res.json(responseData);
			return;
		})
		
	});
	//删除cookie
	app.post('/removeCookie',function(req, res , next) {
		var cookieKey = req.body.cookieKey;
		res.clearCookie(cookieKey);
		responseData.message = '退出账户成功';
		res.json(responseData);
		return;
	})
};
