var httpRequest = require('request');

var config = require('../../config/config');

module.exports = function (request) {

	var options = {
		url: 'http://api.instagram.com/oauth/access_token',
		method: 'POST',
		form: {
			client_id: config.instagram.client_id,
			client_secret: config.instagram.client_secret,
			grant_type: 'authorization_code',
			redirect_uri: config.instagram.redirect_uri,
			code: request.query.code
		}
	};
	httpRequest(options, function (error, response, body) {	
		if (!error && response.statusCode == 200) {
			var user = JSON.parse(body);
			console.log(user)
		}
	});
};
		
