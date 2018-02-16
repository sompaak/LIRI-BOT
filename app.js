require("dotenv").config()
var fs = require("fs")
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


var keys = require("./keys.js")
var twitterClient = new Twitter(keys.twitter)
console.log(keys.twitter)
var spotifyClient = new Spotify(keys.spotify)

function stringBuilder(){
  var returnString = ""
  var nodeArgs = process.argv
  for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        returnString = returnString + "+" + nodeArgs[i];
      }
      else {
        returnString += nodeArgs[i];
      }
  }
  return returnString
}

function getTweets(){
  var params = {screen_name: "nodejs"};
  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    
    if (!error) {
      for ( var i = 0; i < tweets.length; i++){
        console.log("Tweet " + i)
        console.log("Kevin Hart posted: ")
        console.log(tweets[i].text);
        console.log(" ")
        console.log("Tweet Posted At: ")
        console.log(tweets[i].created_at);
        console.log("__________________")
      }            
    }
  });
}

function getMovieInfo(){
  var nodeArgs = process.argv
  var movieName = stringBuilder()
  console.log(movieName)
    
  if(!movieName){

    movieName = "harry potter"
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
         var result = JSON.parse(body)  
        // console.log(result)
          console.log("Movie title: " + result.Title);
          console.log("Release Year: " + result.Year);
          console.log("imdb rating :" + result.imdbRating)
          console.log(result.Ratings[1].Source, result.Ratings[1].Value )
           console.log("country: " + result.Country); 
           console.log("Language: " + result.Language); 
          console.log("Rating: " + result.Rated);
          console.log("plot: " + result.Plot);
          console.log("Actors: " + result.Actors);
          
      }
    });   
}




function getSpotifySongs(){

  var songName = stringBuilder()

  if(!songName){

    songName = "the hills"
  }
   
  spotifyClient.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }




     
    for (var i = 0; i< data.tracks.items.length; i++){
      console.log(data.tracks.items[i].artists[0].name); 
      console.log(data.tracks.items[i].name); 
      console.log(data.tracks.items[i].external_urls.spotify); 
      console.log(data.tracks.items[i].album.name); 
      console.log("_______________________________")
    }

  });

}



function doWhatItSays(){

    fs.readFile("index.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
   
    var options = data.split(",");

      for (var i = 0 ; i<options.length; i++){
          switch(options[i]){

          case "my-tweets":
            getTweets()
            break;
          case "spotify-this-song":
            getSpotifySongs()
            break
          case "movie-this":
            getMovieInfo()
            break 

            }

    }
    


  });

}


switch(process.argv[2]){

  case "my-tweets":
    getTweets()
    break;
  case "spotify-this-song":
    getSpotifySongs()
    break
  case "movie-this":
    getMovieInfo()
    break 
  case "do-what-it-says":
    doWhatItSays()
    break

}
