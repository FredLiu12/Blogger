const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 设置文件上传路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 是否保留表单上传文件的扩展名
    form.keepExtensions = true;
    // 对表单进行解析
    form.parse(req, async (err, fields, files) => {
        // fields存储普通请求参数
        // files存储上传的文件信息
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: files.publishDate,
            // 这里用的是files，接受的上传的图片文件 
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        res.redirect('/admin/article');
    });
}