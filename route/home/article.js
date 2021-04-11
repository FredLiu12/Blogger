const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    const id = req.query.id;
    // 文章信息
    let article = await Article.findOne({ _id: id }).populate('author');
    article = JSON.stringify(article);
    article = JSON.parse(article);
    // 评论信息
    let comments = await Comment.find({ aid: id }).populate('uid');
    comments = JSON.stringify(comments);
    comments = JSON.parse(comments);
    res.render('home/article.art', {
        article: article,
        comments: comments
    });
    }