const { Article } = require('../../model/article');
// 分页
const pagiation = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 获取页码
    const page = req.query.page;
    // 查询数据
    let result = await pagiation(Article).page(page).size(4).display(5).find({}).populate('author').exec();
    // 渲染模板，传递数据
    result = JSON.stringify(result);
    result = JSON.parse(result);
    res.render('home/default.art', {
        result: result
    });
}