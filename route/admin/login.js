// 引入用户集合构造函数
const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    // 接受请求参数
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });
    }
    // 根据邮箱地址查询用户，查询到user是对象类型，存储用户信息
    // 如果没查到。uesr为null
    let user = await User.findOne({ email: email });
    if (user) {
        // 将客户端传递的密码比对
        // true 比对成功
        // false 比对失败
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            // 将用户名存储在req中
            // session是app.js引入的session模块的方法  ，存储到cookie当中
            req.session.username = user.username;
            // 将用户角色存储到session
            req.session.role = user.role;
            // 重定向跳转到user
            // locals为了所有的模板文件都能访问
            req.app.locals.userInfo = user;
            // 对用户的角色判断
            if (user.role == 'admin') {
                res.redirect('/admin/user');
            } else if (user.role == 'normal') {
                res.redirect('/home/' );
            }
        } else {
            // 登录失败
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
    }
}
