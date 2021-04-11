const guard = (req, res, next) => {
    // 判断用户访问是否是login
    // 如果的登录的 放行
    // 如果不是登录的，将请求重定向到登录页面
    // 判断session中有没有username来确定有没有登录
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 如果用户是普通用户，跳转到首页，阻止程序向下执行
        if (req.session.role == 'normal') {
            return res.redirect('/home/');
        }
        // 放行
        next();
    }
}
module.exports = guard;