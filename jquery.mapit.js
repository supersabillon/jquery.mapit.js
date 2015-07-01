(function($){
	'use strict';

	$.fn.mapit = function() {


	  	return this.each(function() {
	  	  	createOverlays();
	  	});


	  	function createOverlays(){
	  		var doc = document,
	  			overlay = doc.createElement("div");

	  			$(overlay).addClass('overlay').css("display", "none");

	  		doc.body.appendChild(overlay);
	  	}

	}
	
}(jQuery));