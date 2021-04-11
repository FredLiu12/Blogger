// 导入bcrypt
const bcrypt = require('bcrypt');

async function run() {
    // 生成随机字符串
    // genSalt方法接受数组作为参数，数值越小生成的随机字符串复杂度越低，反之大，默认10
    // 返回生成的随机字符串
    const salt = await bcrypt.genSalt(10);
    // 对密码加密
    // 1.要加密的明文
    // 2.随机字符串
    // 返回值是加密后的密码
    const result = await bcrypt.hash('h3414...', salt);
    console.log(salt);
    console.log(result);
}
run();