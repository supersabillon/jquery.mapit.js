(function($){
	'use strict';

	$.fn.mapit = function(options) {

		var defaults = {
			width: 400,
			height: 300,
			zoom: 12,
			mapTypeId: 'google.maps.MapTypeId.ROADMAP',
			overlayAttrs: {
				id: 'mapit-overlay'
			},
			overlayCSS: {
				'display': 'none',
				'position' : 'fixed',
				'left' : 50 + '%',
				'top' : 50 + '%',
				'margin-top' : '-' + 150 + 'px',
				'margin-left' : '-' + 200 + 'px',
				'z-index' : 10,
				'outline' : '9999px solid rgba(0,0,0,0.7)'
			},
			overlayCloseCSS: {
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
			},
			mapContainerAttrs: {
				id: 'mapit-wrapper'
			}
		};

		var settings = $.extend(true, {}, defaults, options);

		//load Google API
		$.getScript('http://maps.googleapis.com/maps/api/js');

		//create overlay div to insert maps
		createOverlay();

	  	return this.each(function(index, element) {
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
	  		  zoom: settings.zoom,
	  		  mapTypeId: settings.mapTypeId
	  		};

	  		createMap(mapProp);

	  	}

	  	function createMap(props) {
	  		var map = new google.maps.Map(document.getElementById(settings.mapContainerAttrs.id), props);
	  	}

	  	function createWrappers(index) {
	  		$(this[index]).wrap("<a href='#' class='mapit" + index + "'></a>");
	  	}

	  	function createOverlay(){

			var overlay = $('<div />')
				.attr(settings.overlayAttrs)
				.css(settings.overlayCSS);

			var mapContainer = $('<div />')
				.attr(settings.mapContainerAttrs).css({
					'width' : settings.width + 'px',
					'height' : settings.height + 'px'
				});

			var close = $('<span />').css(settings.overlayCloseCSS)
				.append(document.createTextNode("x"));

			$(overlay).append(close);
			$(overlay).append(mapContainer);
			$("body").append(overlay);
	  	}

	}

}(jQuery));
