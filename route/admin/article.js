const { Article } = require('../../model/article');
const { User } = require('../../model/user');
// 分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 接受页码
    const page = req.query.page;
    // 标识：当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // 查询文章数据
    // page:指定当前页
    // size 指定每页显示的数据条数
    // display：指定客户端要显示的页码数量
    // exec：向数据库中发送查询请求
    // .lean()解决bug
    let articles = await pagination(Article).find().page(page).size(6).display(5).populate('author').exec();
    articles = JSON.stringify(articles);
    articles = JSON.parse(articles);
    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: articles
    });
}