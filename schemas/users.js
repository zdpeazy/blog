var mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String,
    //是否是管理员用户
    isAadmin: {
    	type: Boolean,
    	default: false
    }

});