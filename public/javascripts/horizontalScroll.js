var horizontalScroll = {	
	position : { value: 0, maxValue: 0, tempValue: 0, isLast: false, },
	drag : { state: false, x: 0, count: 0, temp: 0, },
	delta : { x: 0, prevX: 0, currentX: 0, },
	mousedown : 0,
			
	init: function() {
		this.cacheDom();
		this.setScrollItemsWidth(); //dynamic width of scroll items
		this.bindEvents();
	},
	cacheDom: function() {
		this.$body = $("body");
		this.$content = $(".content");
		this.$scrollContainer = $(".scroll");
		this.$scrollItems = this.$scrollContainer.children(".items");
	},
	bindEvents: function() {
		this.$scrollContainer.on("mousewheel", this.moveHorizontally.bind(this));
		this.$scrollContainer.on("mousedown", this.mouseDown.bind(this));		
		this.$scrollContainer.on("mousemove", this.mouseMove.bind(this));
		this.$scrollContainer.on("mouseup", this.mouseUp.bind(this));
	},
	calculateItemsWidth : function(items) {
		var itemsWidth = 0;
		var childrenCount = items.children().length;
		var childWidth = items.children().width();
		var childMargin = 3;

		if (childrenCount > 0) { 
			itemsWidth = (childWidth * childrenCount) + (childMargin * childrenCount) - childMargin;
		}

		return itemsWidth;
	},
	setScrollItemsWidth : function() {
		var width = this.calculateItemsWidth(this.$scrollItems);
		this.$scrollItems.css("width", width);
	},	
	moveHorizontally : function(e) {		
		var isForwardScrollable = false;
		var isBackwardScrollable = false;
		var maxPosition = this.$scrollItems.width() - this.$scrollContainer.width() - 217;
		
		if (Math.abs(this.position.value) >= 0 && Math.abs(this.position.value) < maxPosition) isForwardScrollable = true;
		if (Math.abs(this.position.value) >= maxPosition) isForwardScrollable = false;
		if (Math.abs(this.position.value) != 0) isBackwardScrollable = true;		
		
		if (e.originalEvent.wheelDelta < 0) {
			//on scroll down - move forward to next item
			this.moveForward(isForwardScrollable);
		} else {
			//on scroll up - move back to last item
			this.moveBackward(isBackwardScrollable);
		}		
	},
	moveForward : function(isForwardScrollable) {		
		if (isForwardScrollable == true) { //move foward to display next item
			this.position.value -= 217;
			this.$scrollItems.css({
				transform: "translatex(" + this.position.value + "px" + ")",
				transition: "transform 350ms ease",
			});
		} else { //move forward to display last item
			this.position.tempValue = -Math.abs(this.$scrollItems.width() - this.$scrollContainer.width());
			this.position.isLast = true;
			this.$scrollItems.css({
				transform: "translatex(" + this.position.tempValue + "px" + ")",
				transition: "transform 350ms ease",
			});
		}
	},
	moveBackward : function(isBackwardScrollable) {
		if (isBackwardScrollable && this.position.tempValue == 0) {			 
			this.position.value += 217;
		}
		this.position.tempValue = 0; //reset temp value
		this.position.isLast = false;

		this.$scrollItems.css({
			transform: "translatex(" + this.position.value + "px" + ")",
			transition: "transform 350ms ease",
		});
	},
	dragHorizontally : function() {
		
		if(this.position.isLast == true) { 
			this.position.value = this.position.maxValue;
			this.position.isLast = false;
		 }		
				
		var temp = this.position.value;
		this.position.value -= this.delta.x;		
		
		if(this.position.value <= 0 && this.position.value >= this.position.maxValue ) { //dragging is allowed, delta is within borders of items
			this.$scrollItems.css({
				transform: "translatex(" + this.position.value + "px" + ")",
				transition: "none",
			});
		} else { //dragging is not allow, delta is beyond borders of items
			this.position.value = temp;
		}
	},
	roundToClosestItem : function() {
		//rouding value to to display closest item
		var roundedValue = Math.round(this.position.value / 217) * 217;		

		if (roundedValue > this.position.maxValue && this.position.value != this.position.maxValue) {
			//rounded to closest item
			this.position.isLast = false;
			this.position.value = roundedValue;
			this.$scrollItems.css({
			transform: "translatex(" + this.position.value + "px" + ")",
			transition: "transform 150ms linear",
		});
		} else { 
			//rounded to last item
			this.position.value = roundedValue + 217;
			this.position.isLast = true;			
			this.$scrollItems.css({
			transform: "translatex(" + this.position.maxValue + "px" + ")",
			transition: "transform 150ms linear",
		});			
		}			
	},
	mouseDown: function(e) {
		e.preventDefault();
		this.drag.state = true;
		this.mousedown = e.pageX;			
	},
	mouseMove: function(e) {		
		if(this.drag.state == true) {			
			//get event positions
			this.delta.prevX = this.delta.currentX;
			this.drag.x = e.pageX;			
			this.delta.currentX = this.mousedown - this.drag.x;
			this.delta.x = this.delta.currentX - this.delta.prevX;
			this.position.maxValue = -Math.abs(this.$scrollItems.width() - this.$scrollContainer.width()); // stop here
			this.drag.count++;
						
			//drag item horizontally according to event positions
			this.dragHorizontally();	
		}
	},
	mouseUp: function(e) {
		//dragging finished, reset delta		
		this.drag.state = false;
		this.delta.prevX = 0;
		this.delta.currentX = 0;
		this.delta.x = 0;
		
		//If it was a drag - round and display closest item
		if(this.drag.count > 0) { 
			this.roundToClosestItem();
		}		

		this.drag.temp = this.drag.count;
		this.drag.count = 0;
	},
	getDragTemp : function() {
		return this.drag.temp;
	},
	setDragTemp : function(number) {
		this.drag.temp = number;
	},
	reset : function() {
		this.position = { value: 0, maxValue: 0, tempValue: 0, isLast: false, };
		this.drag = { state: false, x: 0, count: 0, temp: 0, };
		this.delta = { x: 0, prevX: 0, currentX: 0, };
		this.mousedown = 0;
	}
}