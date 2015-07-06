(function($){
	'use strict';

	$.fn.mapit = function() {

		var $mapIt = this;

	  	return $mapIt.each(function(index, element) {
	  		createOverlays(index);
	  		createWrappers(index);
	  		
	  		$(this).on('click', clickHandler);

	  	});


	  	function clickHandler(e) {
	  		
	  		var target = e.currentTarget.parentElement.className,
	  			index = target.slice(-1);

	  		e.preventDefault();

	  		$('.overlay' + index).show().css({
	  			'position' : 'fixed',
	  			'width' : 400 + 'px',
	  			'height' : 300 + 'px',
	  			'left' : 50 + '%',
	  			'top' : 50 + '%',
	  			'margin-top' : '-' + 150 + 'px',
	  			'margin-left' : '-' + 200 + 'px',
	  			'z-index' : 10,
	  			'outline' : '9999px solid rgba(0,0,0,0.5)'
	  		});
	  		
	  	}

	  	function createWrappers(index) {
	  		$($mapIt[index]).wrap("<a href='#' class='mapit" + index + "'></a>")
	  	}


	  	function createOverlays(index){
	  		var doc = document,
	  			overlay = doc.createElement("div");

	  		$(overlay).addClass('overlay' + index).css("display", "none");

	  		doc.body.appendChild(overlay);
	  	}

	}
	
}(jQuery));