
module.exports = function(app){
	app.use(function(req, res, next){
		if(!req.userInfo.isAdmin) {
			res.render('对不起，只有管理员账号才能进入！');
			return;
		}
		next();
	})
	app.get('/admin', function(req, res, next) {
		res.render('admin/index');
	});
};
