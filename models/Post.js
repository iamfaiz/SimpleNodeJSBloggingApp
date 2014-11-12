var mongoose = require('../config/db.js');
var Schema = mongoose.Schema;
var superPagination = require('super-pagination').mongoose;

var PostSchema = new Schema({
	title: { type: String, default: 'Post title' },
	content: { type: String, default: 'Post content' },
	author: { type: String, default: 'Unknown' }
});

PostSchema.plugin(superPagination, {
  theme : 'bootstrap'
});

module.exports = mongoose.model('posts', PostSchema);
