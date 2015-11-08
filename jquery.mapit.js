(function($){
	'use strict';

	$.fn.mapit = function() {

		var $mapIt = this;
		$.getScript('http://maps.googleapis.com/maps/api/js');

		//create overlay div to insert maps
		createOverlay();

	  	return $mapIt.each(function(index, element) {
	  		createWrappers(index);
	  		
	  		$(this).on('click', clickHandler);

	  	});


	  	function clickHandler(e) {
	  		
	  		var target = e.currentTarget.parentElement.className;

	  		e.preventDefault();

	  		$('#mapit-overlay').show()
	  			.find('span').on('click', function(){
	  				$(this).parent().hide();
	  		});

	  		initMap(this);
	  		
	  	}

	  	function initMap(el) {
	  		var latlng = $(el).data('latlng').split(","),
	  			latitude = latlng[0],
	  			longitude = latlng[1],
	  			mapProp = null;

	  		mapProp = {
	  		  center:new google.maps.LatLng(parseInt(latitude), parseInt(longitude)),
	  		  zoom: 12,
	  		  mapTypeId: google.maps.MapTypeId.ROADMAP
	  		};

	  		createMap(mapProp);

	  	}


	  	function createMap(props) {
	  		var map = new google.maps.Map(document.getElementById('mapit-wrapper'), props);
	  	}

	  	function createWrappers(index) {
	  		$($mapIt[index]).wrap("<a href='#' class='mapit" + index + "'></a>");
	  	}


	  	function createOverlay(){
	  		var doc = document,
	  			overlay = doc.createElement("div"),
	  			close = doc.createElement("span"),
	  			closeCopy = doc.createTextNode("x"),
			  	mapContainer = doc.createElement('div');

	  		$(overlay).attr('id', 'mapit-overlay' + index).css({
	  			'display': 'none',
	  			'position' : 'fixed',
	  			'left' : 50 + '%',
	  			'top' : 50 + '%',
	  			'margin-top' : '-' + 150 + 'px',
	  			'margin-left' : '-' + 200 + 'px',
	  			'z-index' : 10,
	  			'outline' : '9999px solid rgba(0,0,0,0.7)'
	  		});


	  		$(mapContainer).attr('id', 'mapit-wrapper').css({
	  			'width' : 400 + 'px',
	  			'height' : 300 + 'px'
	  		});

	  		$(close).css({
	  			'font-family' : 'Arial',
	  			'position' : 'absolute',
	  			'top' : '-' + 10 + 'px',
	  			'right' : '-'  + 10 + 'px',
	  			'display' : 'block',
	  			'width' : 25 + 'px',
	  			'line-height' : 26 + 'px',
	  			'cursor' : 'pointer',
	  			'background-color' : 'black',
	  			'color' : '#fff',
	  			'border' : '1px solid #fff',
	  			'text-align' : 'center',
	  			'border-radius' : 50 + '%',
	  			'box-shadow' : '1px 1px 2px 0 rgba(0, 0, 0, 0.4)',
	  			'z-index' : 1001
	  		});

	  		close.appendChild(closeCopy);
	  		overlay.appendChild(close);
	  		overlay.appendChild(mapContainer);
	  		doc.body.appendChild(overlay);

	  	}

	}
	
}(jQuery));