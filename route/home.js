const express = require('express');
// 穿件博客展示页面路由
const home = express.Router();

// 博客前台首页的展示页面http://localhost/home/
home.get('/', require('./home/index'));

// 博客前台详细展示页面 http://localhost/home/article
home.get('/article', require('./home/article'));

// 创建评论功能路由
home.post('/comment', require('./home/comment'));

// 实现退出功能
home.get('/loginout', require('./home/loginout'));


module.exports = home;