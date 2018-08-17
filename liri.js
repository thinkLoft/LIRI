// NPM Modules
require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// Credentials
var keys = require('./keys.js');
var command = process.argv[2];
var userChoice = '';

// Join user choice commands into one string
for (i = 3; i <= process.argv.length - 1; i++) {
  userChoice += process.argv[i] + ' ';
}

// Third Party Objects
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//     * `my-tweets`

//   * `spotify-this-song`

//   * `movie-this`

//   * `do-what-it-says`

// ================================
// ========== Framework ===========
// ================================

// Error catching if no command is submitted
if (command != undefined) {
  // Capture first command word

  switch (command) {
    case 'my-tweets':
      myTweets();
      break;
    case 'spotify-this-song':
      spotifyInfo(userChoice);
      break;
    case 'movie':
      movie(userChoice);
      break;
    case 'do':
      doWhat(userChoice);
      break;
  }

  // end of if for command
}

// ================================
// ========== My Tweets ===========
// ================================

function myTweets() {
  console.log('My Tweets:');
  console.log('======================');
  client.get('favorites/list', function(error, tweets, response) {
    if (error) throw error;

    for (i = 0; i < tweets.length; i++) {
      console.log(i + ': ' + tweets[i].user.name + ' - ' + tweets[i].text);
    }
  });
}

// ================================
// =========== Spotify ============
// ================================

function spotifyInfo(x) {
  console.log('Spotify');
  console.log('======================');
  var song = x;

  if (song === '') {
    song = 'All the Small Things';
  }

  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // console.log(data.tracks.items);
    console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
    console.log('Song: ' + data.tracks.items[0].name);
    console.log('Preview: ' + data.tracks.items[0].preview_url);
    console.log('Album: ' + data.tracks.items[0].album.name);
  });
}

// ================================
// ============ Movie =============
// ================================

function movie(x) {
  console.log(x);
}

// ================================
// =========== Do What ============
// ================================

function doWhat(x) {
  console.log(x);
}
