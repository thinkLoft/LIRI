// NPM Modules
require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');

// Global variabes
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var userChoice = '';
var twitterAns = [];
var spotifyAns = [];
var movieAns = [];

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
  client.get('favorites/list', function(error, tweets, response) {
    if (error) throw error;

    // Finesse
    twitterAns.push('======================');
    twitterAns.push('My Favourite Tweets:');
    twitterAns.push('======================');

    // Parse twitter array reponse
    for (i = 0; i < tweets.length; i++) {
      twitterAns.push(i + ': ' + tweets[i].user.name + ' - ' + tweets[i].text);
    }

    // Update user and log
    for (i = 0; i < tweets.length; i++) {
      console.log(twitterAns[i]);
      updateLog(twitterAns[i]);
    }
  });
}

// ================================
// =========== Spotify ============
// ================================

function spotifyInfo(x) {
  var song = x;

  // Finesse
  spotifyAns.push('======================');
  spotifyAns.push('Spotify');
  spotifyAns.push('======================');

  // If no song selected, run this
  if (song === '') {
    song = 'Never gonna give you up';
  }

  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // Update Spotify Answer Object with Data
    spotifyAns.push('Artist: ' + data.tracks.items[0].album.artists[0].name);
    spotifyAns.push('Song: ' + data.tracks.items[0].name);
    spotifyAns.push('Preview: ' + data.tracks.items[0].preview_url);
    spotifyAns.push('Album: ' + data.tracks.items[0].album.name);

    // Output data to User
    for (i = 0; i < spotifyAns.length; i++) {
      console.log(spotifyAns[i]);
      updateLog(spotifyAns[i]);
    }
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
  request(
    'http://www.omdbapi.com/?t=' + x + '&y=&plot=short&apikey=trilogy',
    function(error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

        movieAns.push('======================');
        movieAns.push('Movie');
        movieAns.push('======================');
        movieAns.push('The Title is: ' + JSON.parse(body).Title);
        movieAns.push('The Year is: ' + JSON.parse(body).Year);
        movieAns.push('The imdbRating is: ' + JSON.parse(body).imdbRating);
        movieAns.push('The Country is: ' + JSON.parse(body).Country);
        movieAns.push('The Language is: ' + JSON.parse(body).Language);
        movieAns.push('The Plot is: ' + JSON.parse(body).Plot);
        movieAns.push('The Actors is: ' + JSON.parse(body).Actors);

        if (body.Ratings === undefined) {
          movieAns.push('No Ratings Available (NULL)');
        } else if (body.Ratings !== 'Rotten Tomatoes') {
          movieAns.push(
            'No Rotten Tomato rating available, Here is another: ' +
              'The ' +
              JSON.parse(body).Ratings[0].Source +
              ' score is ' +
              JSON.parse(body).Ratings[0].Value
          );
        } else {
          for (i = 0; i < JSON.parse(body).Ratings.length; i++) {
            // console.log(JSON.parse(body).Ratings[i].Source);
            if (JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes') {
              movie.Ans.push(
                'The ' +
                  JSON.parse(body).Ratings[i].Source +
                  ' score is ' +
                  JSON.parse(body).Ratings[i].Value
              );
            }
          }
        }

        for (i = 0; i < movieAns.length; i++) {
          console.log(movieAns[i]);
        }

        for (i = 0; i < movieAns.length; i++) {
          updateLog(movieAns[i]);
        }
      }
    }
  );
}

// ================================
// =========== Do What ============
// ================================

function doWhat() {
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
    }
  });
}

// ================================
// ============= Log ==============
// ================================
function updateLog(log) {
  fs.appendFileSync('log.txt', log + '\n', function(err) {
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  });
}
