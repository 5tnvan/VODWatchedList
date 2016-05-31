var router = {	
	$routes : { 
		home: $(".header a[data-route='home']"), 
		user: $(".header a[data-route='user']"), 
		default: null
	},
	callback : null,
	init: function(callback) {
		this.cacheDom();
		this.cacheCallback(callback);
		this.routingToHome(); //load home page on first load
		this.bindEvents();
		var x = "Im here";
	},
	cacheDom: function() {
		this.$content = $(".content");
	},
	cacheCallback: function(callback) {
		this.callback = callback;
	},
	bindEvents: function() {
		this.$routes.home.on("click", this.routingToHome.bind(this));
		this.$routes.user.on("click", this.routingToUser.bind(this));
	},
	routingToHome : function() {
		this.refreshContentContainer("home");
		this.resetPlugins();
		this.getData("/api/movies", "movies");
		var x = "Im here";
	},
	routingToUser : function() {
		this.refreshContentContainer("user");
		this.resetPlugins();
		this.printUserProfile();
		this.getData("/api/user/johndoe", "history");
	},
	getData : function (url, htmlType) {		
		$.ajax({
			url: url,
			dataType: 'json',
			context: this,
			success: function (response) {
				if (response) {
					if(htmlType == "movies") { 
						this.printMovies(response);
					} else {
						this.printHistory(response);
					}
				}
			},
			error: function (response) { console.log("Error:" + response); }
		});
	},
	printMovies : function(response){
		var $content = this.$content;
		var $h2 = $('<h2 />', { text: "Popular Movies" }).appendTo($content);
		var $scroll = $('<div />', { class : "scroll" }).appendTo($content);
		var $moviesContainer = $('<ul />', { class : "items movies" }).appendTo($scroll);
		
		for (var i = 0; i < response.length; i++) {
			var $movie = $('<li />').appendTo($moviesContainer);
			var $link = $('<a />', { href: "javascript:void(0)", "data-movie-url": response[i].content.videoUrl, "data-movie-id" : response[i].id }).appendTo($movie);
			var $image = $('<img />', { src: "/images/movies/" + response[i].content.imageUrl }).appendTo($link);
			var $info = $('<div />', { class: "info" }).appendTo($link);
			var $title = $('<div />', { class: "title", text: response[i].title }).appendTo($info);
			var $description = $('<div />', { class: "desc", text: response[i].description }).appendTo($info);
		}
		
		this.callback();	
	},
	printHistory : function(response) {
		response.watchedMovies.sort(function(a,b) {
			return new Date(a.time).getTime() - new Date(b.time).getTime(); 			
		}).reverse();
		
		var $content = this.$content;
		var $h2 = $('<h2 />', { text: "Watched Movies" }).appendTo($content);
		var $scroll = $('<div />', { class : "static" }).appendTo($content);
		var $moviesContainer = $('<ul />', { class : "items movies" }).appendTo($scroll);
		
		for (var i = 0; i < response.watchedMovies.length; i++) {			
			var time = Date.parse(response.watchedMovies[i].time);
			var timeSince = this.calculateTimeSince(time);
			var $movie = $('<li />').appendTo($moviesContainer);
			var $image = $('<img />', { src: "/images/movies/" + response.watchedMovies[i].movie.content.imageUrl }).appendTo($movie);
			var $info = $('<div />', { class: "info" }).appendTo($movie);
			var $title = $('<div />', { class: "title", text: response.watchedMovies[i].movie.title }).appendTo($info);
			var $time = $('<div />', { class: "time f-yellow", text: "Watched " +  timeSince + " ago" }).appendTo($info);
			var $description = $('<div />', { class: "desc", text: response.watchedMovies[i].movie.description }).appendTo($info);			
		}
	},
	printUserProfile : function() {
		var $content = this.$content;
		var $profileContainer = $('<div />', { class : "profileContainer b-yellow f-white" }).appendTo($content);
		var $profile = $('<div />', { class : "profile" }).appendTo($profileContainer);	
		var $name = $('<div />', { class : "name", text: "John Doe" }).appendTo($profile);
		var $username = $('<div />', { class : "username", text: "@johndoe" }).appendTo($profile);
	},
	refreshContentContainer : function (route) {
		this.$content.empty();
		this.$content.attr("id", route);
	},
	calculateTimeSince : function(date) {
		var seconds = Math.floor((new Date() - date) / 1000);
		var interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	},
	resetPlugins : function() {
		horizontalScroll.reset();
	}	
}