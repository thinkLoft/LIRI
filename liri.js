// NPM Modules
require('dotenv').config();

// Credentials
var keys = require('./keys.js');
var spotifyKeys = keys.spotify;
var twitterKeys = keys.twitter;

var command = process.argv[2];

// 10. Make it so liri.js can take in one of the following commands:

//     * `my-tweets`

//   * `spotify-this-song`

//   * `movie-this`

//   * `do-what-it-says`

// ================================
// ========== Framework ===========
// ================================

// Error catching if no command is submitted
if (command != undefined) {
  // Create Arrary splitting command
  var userChoice = command.split('-', 2);

  // Capture first command word
  var action = userChoice[0];

  switch (action) {
    case 'my':
      myTweets();
      break;
    case 'spotify':
      spotify(command);
      break;
    case 'movie':
      movie(command);
      break;
    case 'do':
      doWhat(command);
      break;
  }

  // end of if for command
}

// ================================
// ========== My Tweets ===========
// ================================

function myTweets() {
  console.log(command);
}

// ================================
// =========== Spotify ============
// ================================

function spotify(x) {
  console.log(x);
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
