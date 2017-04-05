/*生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use('/', routes); 加载。
这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中。*/
//修改的写法
var User = require('../models/User');
module.exports = function(app){
	app.use(function(req, res, next) {
	  	//取出登录用户userInfo的cookie信息，判断登录状态
	  	req.userInfo = {};
	  	//console.log(JSON.parse(req.cookies.userInfo)._id);
	  	if(req.cookies.userInfo){
	  		req.userInfo = JSON.parse(req.cookies.userInfo);
  			//获取当前登录用户的类型是否是管理员
  			User.findOne({
  				_id:JSON.parse(req.cookies.userInfo)._id,
  			}).then(function(userInfo){
  				req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
  				next();
  			});
	  	}
	  	next();
	});
};
