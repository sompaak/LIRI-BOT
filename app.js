var Twitter = require('twitter');

var name = process.argv[2]

var twitterClient = new Twitter({
  consumer_key: 'M39K6oj5hx7c1DtE9I2KJNYWL',
  consumer_secret: '4BhKpluyTriEJIq6Y14NedlsOBZhfqgVlqy5pXHRd0UwrjmcuY',
  access_token_key: '240497888-BhhrWyyzMSptodKdHRiNBum3ziD8KdVUX0fstyHa',
  access_token_secret: 'rWiUAz9Wmrmmo76Y91XSOk6E2c1wNQ5aGYuMrM3GlDblw'
});

var Spotify = require('node-spotify-api');
     
var spotify = new Spotify({
  id: "0e7736924c084d1db7f7a500ad0b6da3",
  secret:"a62f853c5dc24e468e3c1b8f18caa484"
});

var request = require("request");

function getTweets(){
    var params = {screen_name: "billburr"};
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for ( var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text);
                
                console.log(tweets[i].created_at);
                console.log(" ")
          }
              
      }
    });
}

//twitter()

function getMovieInfo(){
  var nodeArgs = process.argv
  var movieName = stringBuilder()
  console.log(movieName)
    
  if(!movieName){

    movieName = "inception"

  }


  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {

      // If the request is successful
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


//getMovieInfo()



function getSpotifySongs(){

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

  var songName = stringBuilder()
   
  spotify.search({ type: 'track', query: songName }, function(err, data) {
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

//getSpotifySongs()


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

}
