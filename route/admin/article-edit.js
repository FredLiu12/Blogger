const { Article } = require('../../model/article');
module.exports = async (req, res) => {
    const { id } = req.query;
    if (id) {
        // 修改
        let editarticle = await Article.findOne({ _id: id }).populate('author');
        editarticle = JSON.stringify(editarticle);
        editarticle = JSON.parse(editarticle);
        res.render('admin/article-edit', {
            editarticle,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    } else {
        // 添加
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }
    // 标识：当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';


}