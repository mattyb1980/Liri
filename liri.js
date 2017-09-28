// Brings in keys from external keys.js file.
var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var fs = require("fs");



var nodeArgs = process.argv;
var action = process.argv[2];
var subject = "";
// var movieName = "";

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    subject = subject + "+" + nodeArgs[i];

  }

  else {

    subject = nodeArgs[i];

  }
}



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

    case "do-what-it-says":
    liriDo();
    break;
}

function liriDo(){
  fs.readFile("random.txt", "utf8", function(error, data){

    if (error) {
        return console.log(error);
    }
      var dataArr = data.split(",");


      action = dataArr[0];
      subject = dataArr[1];

      console.log(action);

      if(action === "spotify-this-song"){
        spotify();
      }
      if(action === "movie-this"){
        omdb();
      }
      if(action === "my-tweets"){
        twitter();
      }

});


  

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
  if (subject === "") {
    keys.spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: "1" }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("HEY YOU DIDN'T CHOOSE A SONG! SO I CHOSE ONE FOR YOU!")
      console.log("")
      console.log("")
      console.log("<><><><><><><><><><><><><><><><>");
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      if (data.tracks.items[0].preview_url == null) {
      console.log(data.tracks.items[0].external_urls.spotify)
    } else {console.log("Preview Link: " + data.tracks.items[0].preview_url);}
      console.log("<><><><><><><><><><><><><><><><>");
      console.log("")
      console.log("") 
    });
    } else {
  	keys.spotify.search({ type: 'track', query: subject, limit: "1" }, function(err, data) {
    		if (err) {
      		return console.log('Error occurred: ' + err);
    		}
    		console.log("")
        console.log("")
        console.log("<><><><><><><><><><><><><><><><>");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        if (data.tracks.items[0].preview_url == null) {
        console.log(data.tracks.items[0].external_urls.spotify)
      } else {console.log("Preview Link: " + data.tracks.items[0].preview_url);}
        console.log("<><><><><><><><><><><><><><><><>");
        console.log("")
        console.log("")
    });
  }
}
function omdb(){
  
    if (subject === "") {
      request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        
        if (!error && response.statusCode === 200){

          console.log("HEY YOU DIDN'T CHOOSE A MOVIE! SO I CHOSE ONE FOR YOU!")
          console.log("")
          console.log("")
          console.log("<><><><><><><><><><><><><><><><>");
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
          console.log("<><><><><><><><><><><><><><><><>");
          console.log("")
          console.log("")

        } else {
            console.log(error);
          }
          })
          }else {request("http://www.omdbapi.com/?t=" + subject + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

            if (!error && response.statusCode === 200) {

                console.log("")
                console.log("")
                console.log("<><><><><><><><><><><><><><><><>");
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
                console.log("<><><><><><><><><><><><><><><><>");
                console.log("")
                console.log("")
              } else{console.log(error);
                }

          });
      };
  };
}  