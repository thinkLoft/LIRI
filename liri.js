// NPM Modules
require('dotenv').config();

// Credentials
var keys = require('./keys.js');
var spotify = keys.spotify;
var twitter = keys.twitter;

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
      // myTweets();
      console.log('tweets');
      break;
    case 'spotify':
      // spotify(command);
      console.log('spotify');
      break;
    case 'movie':
      // movie(command);
      console.log('movie');
      break;
    case 'do':
      // doWhat(command);
      console.log('do');
      break;
  }

  // end of if for userChoice
}
