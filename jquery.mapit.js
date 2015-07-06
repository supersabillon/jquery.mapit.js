(function($){
	'use strict';

	$.fn.mapit = function() {

		var $mapIt = this;

	  	return this.each(function() {
	  	  	createOverlays();
	  	  	createWrappers();
	  	});


	  	function createWrappers() {
	  		$mapIt.wrap("<a href='#'></a>")
	  	}

	  	function createOverlays(){
	  		var overlay = document.createElement("div");

	  			$(overlay).addClass('overlay').css("display", "none");

	  		doc.body.appendChild(overlay);
	  	}

	}
	
}(jQuery));