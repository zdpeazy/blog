/*生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use('/', routes); 加载。
这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中。*/
//修改的写法
module.exports = function(app){
	app.get('/', function(req, res, next) {
		console.log(req.userInfo);
		res.render('main/index',{ 
			userInfo: req.userInfo
		});
	});
};
