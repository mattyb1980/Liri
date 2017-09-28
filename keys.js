// Engaging Twitter API
var twitter = require("twitter");


var client = new twitter ({
  consumer_key: 'WrRmkx7fjf7XMBueHeBmTOIDA',
  consumer_secret: 'Idy52y1bllKhsc4u0zmsU9YDlmsPvl6KCwa02SYo6ymYYUvjLX',
  access_token_key: '2190372909-6cu4IgPLqHswRceTUcLG3dr7tkHHLgYU9gS06kf',
  access_token_secret: 'vjaWrhpA6EBAL8h4vUpJHhQaHb5no8uwzEmwZ8GQmhLDM'
});

// Engaging Spotify API
var Spotify = require('node-spotify-api');

var spotify = new Spotify ({
  id: 'a3ab416e2d0f40bd8382f41f2de91f44',
  secret: 'e8790075162049888a9a0c115720b748'
});
 


module.exports = {

	client: client,
	spotify: spotify

}