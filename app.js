angular.module('twitchApp', [])
  .controller('TwitchController', ['$http', function($http) {
    var twitch = this;
    twitch.sort = 'all'
    
    twitch.online = function(boo) {
    	if (boo) {
    		return "Online"
    	}
    	else {return "Offline"}
    }
 
    users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff", "medrybw"];
    twitch.streams = [];
	  users.forEach(function(user){
	  	$http.jsonp("https://api.twitch.tv/kraken/users/" + user + "?callback=JSON_CALLBACK").success(function(data){
	  		info = {}
	  		info.name = data.display_name;
	  		if (data.logo === null) {
	  			info.logo = 'http://placehold.it/300?text=N/A'
	  		} else {info.logo = data.logo;}
	  		info.url = 'http://twitch.tv/' + data.name;
	  		info.online = false;
	  		$http.jsonp("https://api.twitch.tv/kraken/streams/" + info.name + "?callback=JSON_CALLBACK").success(function(data){
	  			if(data.stream){
	  				info.online = true;
	  				info.status = data.stream.channel.status;
	  			}
	  			twitch.$apply
	  		});
	  		console.log(info);
	  	 	twitch.streams.push(info);
	  	})
	  })
  }]);

///// To Do /////
// Get proper order
	//one call ??
// Mobile Menu
//OPT: Search