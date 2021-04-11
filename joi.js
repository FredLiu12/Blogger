const Joi = require('joi');
// 定义对象的验证规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
};

async function run() {
    try {
        // 实施验证
        // validate返回的promise对象,用async函数就要try catch捕获错误
        await Joi.validate({ username: 'ab', birth: 1800 }, schema);
    } catch (ex) {
        // message：错误简单信息
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}
run();