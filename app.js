

function twitter(){
    var Twitter = require('twitter');

    var client = new Twitter({
      consumer_key: 'M39K6oj5hx7c1DtE9I2KJNYWL',
      consumer_secret: '4BhKpluyTriEJIq6Y14NedlsOBZhfqgVlqy5pXHRd0UwrjmcuY',
      access_token_key: '240497888-BhhrWyyzMSptodKdHRiNBum3ziD8KdVUX0fstyHa',
      access_token_secret: 'rWiUAz9Wmrmmo76Y91XSOk6E2c1wNQ5aGYuMrM3GlDblw'
    });

    var handle = process.argv[2];
    var params = {screen_name: handle};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for ( var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text);
                
                console.log(tweets[i].created_at);
                console.log(" ")
          }
              
      }
    });
}

function omdb(){
 
    var request = require("request");
    var nodeArgs = process.argv;
    var movieName = "";
    for (var i = 2; i < nodeArgs.length; i++) {
      if (i > 2 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      }
      else {
        movieName += nodeArgs[i];
      }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

      // If the request is successful
      if (!error && response.statusCode === 200) {
          
          console.log("Movie title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("Rating: " + JSON.parse(body).Rated);
          console.log("plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          
      }
    });   
}

omdb()