var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
	q: '#chtijs',
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

T.get('search/tweets', params, function(err, data, response) {
	if (!err) {
		data.statuses.map((tweet) => {
			let screen_name  = tweet.user.screen_name

			T.post('friendships/create', {
				screen_name
			}, function(err, response) {
				// If the favorite fails, log the error message
				if (err) {
					console.error(err);
				}
				// If the favorite is successful, log the url of the tweet
				else {
					console.log('Following: ', screen_name)
				}
			});
		})
	} else {
		console.error('Error searching for tweets: ', err);
	}
})