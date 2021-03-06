// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");



// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true })); 

var db = require('./models/index.js');   


//ROUTES

app.get('/posts', function(req, res) {
	db.Post.find({}, function(err, posts) {
		if(err) console.log(err);
		res.render('index', {posts: posts});
	});
});

app.post('/posts', function(req, res) {
	console.log(req.body);
	db.Post.create(req.body, function(err, post) {
		console.log("post request went through");
		if (err) console.log(err);
		res.json(post);
	});
});

app.delete('/posts/:_id', function(req, res) {
	console.log('post id is ', req.params._id);
	db.Post.find({
		_id: req.params._id
	}).remove(function(err, post) {
		console.log("post deleted");
		res.json("The post is gone");
	});
});

app.put('/posts/:_id', function(req, res) {
	var toBeLiked = db.Post.find({
		_id: req.params._id
	});

	toBeLiked.likeCount = toBeLiked.likeCount + 1;
	console.log("the likes are updated");
	res.json("the post is liked");

});







    app.listen(3000, function (){
      console.log("listening on port 3000");
    });