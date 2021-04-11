const mongoose = require('mongoose');
// 创建评论功能规则
const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String,
        required: true
    }
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
}