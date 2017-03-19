var mongoose = require('mongoose')
var usersSchema = require('../schemas/users') //拿到导出的数据集模块
var User = mongoose.model('user', usersSchema) // 编译生成Movie 模型
module.exports = User;
