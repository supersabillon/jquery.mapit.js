(function($){
	'use strict';

	$.fn.mapit = function() {
	  	return this.each(function() {
	  	  console.log($(this).html());
	  	});
	}
	
}(jQuery));