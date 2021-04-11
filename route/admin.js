const express = require('express');
const admin = express.Router();

admin.get('/login', require('./admin/loginpage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 用户列表页面
admin.get('/user', require('./admin/userpage'));

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

// 创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 用户信息修改路由
admin.post('/user-modify', require('./admin/user-modify'));

// 删除用户路由
admin.get('/delete', require('./admin/user-delete'));

// 文章列表页面路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能路由
admin.post('/article-add', require('./admin/article-add'));

// 创建文章修改
admin.post('/article-modify', require('./admin/article-modify'));

// 创建文章删除
admin.get('/article-delete', require('./admin/article-delete'));

// 实现退出功能
admin.get('/loginout', require('./admin/loginout'));

module.exports = admin;