var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
	q: '#nodejs',
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

T.get('search/tweets', params, function(err, data, response) {
	if (!err) {
		data.statuses.map((tweet) => {
			let id = { id: tweet.id_str }

			T.post('favorites/create', id, function(err, response) {
				// If the favorite fails, log the error message
				if (err) {
					console.log(err[0].message);
				}
				// If the favorite is successful, log the url of the tweet
				else {
					let username = response.user.screen_name;
					let tweetId = response.id_str;
					console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
				}
			});
		})
	} else {
		console.error('Error searching for tweets: ', err);
	}
})