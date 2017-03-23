/*生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use('/', routes); 加载。
这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中。*/
//修改的写法
module.exports = function(app){
	app.use(function(req, res, next) {
		// Cookies that have not been signed
	  	/*console.log('Cookies: ', req.cookies.userInfo);*/
	  	// Cookies that have been signed
	  	/*console.log('Signed Cookies: ', req.signedCookies);*/

	  	//取出登录用户userInfo的cookie信息，判断登录状态
	  	req.userInfo = {};
	  	if(req.cookies.userInfo){
	  		try{
	  			req.userInfo = JSON.parse(req.cookies.userInfo)
	  		}catch(e){}
	  	}
	  	next();
	});
};
