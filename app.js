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
			let id = {
				id: tweet.id_str
			}
			
			createFavoritePromise(id)
			.catch(error => {
				console.error('error : '+ error)
			})
		})
	} else {
		console.error('Error searching for tweets: ', err);
	}
})

function createFavoritePromise(id){
	return new Promise((resolve, reject) => {
		T.post('favorites/create', id, function(err, favorites){
			if(err){
				console.error(err)
				reject(err)
			} else {
				let username = favorites.user.screen_name;
				let tweetId = favorites.id_str;
				resolve(console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`))
			}
		})
	})
}