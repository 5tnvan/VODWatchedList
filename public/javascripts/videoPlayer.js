var videoPlayer = {	
	movie : { id: null, url: null },
	init: function(callback) {
		this.cacheDom();
		this.bindEvents();
	},
	cacheDom: function() {
		this.$scrollItems = $(".scroll .items");
		this.$video = $("#video");
		this.video = document.getElementById("video");
	},
	bindEvents: function() {
		var that = this;
		this.$scrollItems.on("click", "li a", function() {
			that.movie.id = $(this).attr("data-movie-id");
			that.movie.url = $(this).attr("data-movie-url");
			that.checkClickValidity();
		});
		this.$video.on("webkitfullscreenchange mozfullscreenchange msfullscreenchange fullscreenchange", this.stopVideo.bind(this));
		this.$video.on("ended", this.exitFullScreen.bind(this));
	},
	checkClickValidity : function() {
		if( horizontalScroll.getDragTemp() == 0 ) {//it's a click event
			this.playFullscreen();
			this.postUserWatchedMovie(this.movie.id, "johndoe");
			horizontalScroll.setDragTemp(0);
		}	
	},
	playFullscreen : function() {
		
		//set url and autoplay
		this.video.setAttribute("src", this.movie.url);
		this.video.setAttribute("autoplay", "autoplay");
		
		//play fullscreen
		if (!document.fullscreenElement &&
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { 
			if (this.video.requestFullscreen) {
				this.video.requestFullscreen();
			} else if (this.video.msRequestFullscreen) {
				this.video.msRequestFullscreen();
			} else if (this.video.mozRequestFullScreen) {
				this.video.mozRequestFullScreen();
			} else if (this.video.webkitRequestFullscreen) {
				this.video.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		}
	},
	stopVideo : function() {
		var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		var event = state ? 'FullscreenOn' : 'FullscreenOff';

		if (event == "FullscreenOff") this.$video.trigger("pause");
	},
	exitFullScreen : function() {
		document.webkitExitFullscreen();
	},
	postUserWatchedMovie : function(movieId, username) {		
		var data = {
			"id": movieId,
			"time" : new Date().toISOString(),
			"watchedDuration" : 0, //the app doesn't track watched duration for now			
		}		
		$.ajax({
			type: "PUT",
			url: "/api/users/" + username + "/watchedMovies",
			dataType: 'json',
			data: data,
			success: function (response) { console.log("Success: Watched movie saved"); },
			error: function (response) { console.log("Error: No movie was saved"); }
		});					
	}
	
	
}