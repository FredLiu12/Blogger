const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    const { username, email, role, state, password } = req.body;
    const id = req.query.id;
    let user = await User.findOne({ _id: id });

    // 密码比对
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
        // 密码比对成功
        // res.send('密码比对成功');
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        // 密码比对失败
        let obj = {
            path: '/admin/user-edit',
            message: '密码比对失败，不能进行用户信息修改',
            id: id
        }
        next(JSON.stringify(obj));
    }

}