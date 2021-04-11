const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const dateFormat = require('dateformat');
const template = require('art-template');
const morgan = require('morgan');
const config = require('config');

// 数据库连接
require('./model/connect');
// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));

// 配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        // 一天以后登录状态失效
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'));
// 告诉expres框架模板的默认后缀
app.set('view engine', 'art');
// 当渲染后缀为art模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));


// 获取系统变量，返回值是对象
if (process.env.NODE_ENV == 'development') {
    console.log('当前是开发环境');
    // 在开发环境中，将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'));//GET /admin/login 200 28.548 ms - 2167
} else {
    console.log('当前是生产环境');
}

const admin = require('./route/admin');
const home = require('./route/home');

// 拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse() 
    const result = JSON.parse(err);
    // {path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id}
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

app.listen(80);
console.log('网站服务器启动成功')

