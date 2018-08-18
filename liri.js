// NPM Modules
require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');

// Global variabes
var command = process.argv[2];
var userChoice = '';
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// Join user choice commands into one string
for (i = 3; i <= process.argv.length - 1; i++) {
  userChoice += process.argv[i] + ' ';
}

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
    case 'movie-this':
      movie(userChoice);
      break;
    case 'do-what-it-says':
      doWhat();
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
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.

function movie(x) {
  console.log('Movie');
  console.log('======================');
  var movie = x;

  request(
    'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy',
    function(error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log('The Title is: ' + JSON.parse(body).Title);
        console.log('The Year is: ' + JSON.parse(body).Year);
        console.log('The imdbRating is: ' + JSON.parse(body).imdbRating);
        console.log('The Country is: ' + JSON.parse(body).Country);
        console.log('The Language is: ' + JSON.parse(body).Language);
        console.log('The Plot is: ' + JSON.parse(body).Plot);
        console.log('The Actors is: ' + JSON.parse(body).Actors);
        // ============ Needs fixing
        // for (i = 0; i < JSON.parse(body).Ratings.length; i++) {
        //   // console.log(JSON.parse(body).Ratings[i].Source);
        //   if (JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes') {
        //     console.log(
        //       'The ' +
        //         JSON.parse(body).Ratings[i].Source +
        //         ' score is: ' +
        //         JSON.parse(body).Ratings[i].Value
        //     );
        //   }
        // }
      }
    }
  );
}

// ================================
// =========== Do What ============
// ================================

function doWhat() {
  // This block of code will read from the "movies.txt" file.
  // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile('random.txt', 'utf8', function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(',');
    command = dataArr[0];
    for (i = 1; i <= dataArr.length - 1; i++) {
      userChoice += dataArr[i] + ' ';
    }

    // We will then re-display the content as an array for later use.
    switch (dataArr[0]) {
      case 'my-tweets':
        myTweets();
        break;
      case 'spotify-this-song':
        spotifyInfo(userChoice);
        break;
      case 'movie-this':
        movie(userChoice);
        break;
      case 'do-what-it-says':
        doWhat();
        break;
    }
  });
}
