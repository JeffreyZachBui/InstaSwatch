var express = require('express');
var app = express();
var InstagramAPI = require('instagram-api');
var request = require('request');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// set the view engine to ejs
app.set('view engine', 'ejs');

var userSchema = new Schema({

	id: Number,
	username: String,
	full_name: String,
	bio: String,
	website: String,
	profile_picture: String,
	access_token: String

});
var User = mongoose.model('User', userSchema);

var config = require('./config/config');

mongoose.connect(config.db.uri);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/auth', function (req, res) {
	
	res.send('loading...');
	var code = req.url.split('code=')[1];

	request.post({ 
	    form: {
	 		client_id: 'dc49c638a16442a986efdf2efa8d84d3',
	 		client_secret: 'e8fdf996db254ab79284d6889cdddab0',
	 		grant_type: 'authorization_code',
	 		redirect_uri: 'http://localhost:3000/auth',
	 		code: req.query.code
	 	},
	    url: 'https://api.instagram.com/oauth/access_token'
	  	},
	  	function (err, response, body) {
		    var user_media;
		    if (err) 
		    {
		      	res.send('error in Post');
		    }
		    else
		    {
		      	var access_token = JSON.parse(body).access_token
		      	var instagram_api = new InstagramAPI(access_token);

		      	var options = {};

		      	function user_media_api_call (options) {
		      		
					instagram_api.userSelfMedia(options).then(function(result) {
						something = 0;
						result.data.forEach(function(post){
							console.log(post.link);
							something++;
							console.log(something)
						});
	
						if ( result.data.length == 20 )
						{
							options = {
								max_id: result.data[19].id
							}
							user_media_api_call(options);
						}


					}, function(err){
					    console.log(err); // error info 
					});
				}
				user_media_api_call(options);
				//console.log(user_media.length);
			}
				// use the instagram package to get our profile's media 
				// render the home page and pass in our profile's images 

				//res.render('pages/homescreen', {grams: user_media});
		});
});

app.get('/login', function (request, response) {
	response.redirect(config.instagram.auth_url);
});
app.get('/', function (request, response) {
	response.render('pages/index');
});


app.listen(3000);
console.log('App is running on port 3000');
