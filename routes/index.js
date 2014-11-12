var express = require('express');
var router = express.Router();
var Post = require('../models/Post.js');

/* GET home page. */
router.get('/', function(req, res) {
	Post.paginate({
	    page : req.query.page || 1,
	    select : 'title content author',
	    per_page : 2,
	    url : '/'
	}, function(err, posts, pagination){
    if (err) return console.log('Error', err);

    res.render('posts', {
        posts : posts,
        pagination : pagination.render()
    });
	});
});

router.get('/post/:id', function(req, res) {
	if (typeof req.params.id == 'undefined') {
		return res.redirect('/');
	}
	
	Post.findOne({ _id: req.params.id }, function(err, post) {
		if (err) {
			res.status(404).send( "Can't find what you're looking for!" );
		};
		res.render('single', {
			title: 'Single Post Page',
			post: post
		});
	});
});

router.get('*', function (req, res) {
	res.sendFile( require('path').resolve('public/html/404.html') );
});

module.exports = router;
