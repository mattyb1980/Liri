// Brings in keys from external keys.js file.
var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');

var action = process.argv[2];
var subject = process.argv[3];


switch (action) {
  case "my-tweets":
    twitter();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    omdb();
    break;
}

function twitter(){
	var params = {screen_name: 'MattBeebe80'};
	keys.client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for(var i = 0; i < 20; i++){
    			console.log(tweets[i].text);
			  	if (error) {
    				console.log("We Got An Error" + error);
		  		}
			}
		}
	});

}

function spotify(){
	keys.spotify.search({ type: 'track', query: subject, limit: "4" }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
  		console.log("")
  		console.log("")
  		console.log("<><><><><><><><><><><><><><><><>");
  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
  		console.log("Album: " + data.tracks.items[0].album.name);
  		console.log("Preview Link: " + data.tracks.items[0].preview_url);
  		console.log("<><><><><><><><><><><><><><><><>");
  		console.log("")
  		console.log("")
		// console.log(JSON.stringify(data, null, 2)); 
		if (data.tracks.items[0].preview_url = null) {
			return console.log(data.tracks.items[0].external_urls.spotify)
		}
	});
}


function omdb(){
	var queryUrl = "http://www.omdbapi.com/?t=" + subject + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl, function(error, response, body) {
		if (subject == null) {
			request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
			});
		}

  		if (!error && response.statusCode === 200) {

			console.log("Title: " + JSON.parse(body).Title);
    		console.log("Release Year: " + JSON.parse(body).Year);
    		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    		console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
    		console.log("Directed By: " + JSON.parse(body).Director);
    		console.log("Writen By: " + JSON.parse(body).Writer);
    		console.log("Actors: " + JSON.parse(body).Actors);
    		console.log("Plot: " + JSON.parse(body).Plot);
    		console.log("Country: " + JSON.parse(body).Country);
    		console.log("Language: " + JSON.parse(body).Language);


  		}
  	console.log(queryUrl);

	});
}	
// keys.client.get('search/tweets', {q: 'bmw'}, function(error, tweets, response) {
//    console.log(tweets);
// });
