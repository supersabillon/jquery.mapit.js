(function($){
	'use strict';

	$.fn.mapit = function(options) {

		//load Google API
		$.getScript('http://maps.googleapis.com/maps/api/js');

		var defaults = {
			width: 400,
			height: 300,
			mapOptions: {
				zoom: 5,
				mapTypeId: 'ROADMAP',
			},
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


		//create overlay div to insert maps
		createOverlay();

	  	return this.each(function(index, element) {
	  		createWrappers.call(this, index);

	  		$(this).on('click', clickHandler);

	  	});

	  	function clickHandler(e) {

	  		var target = e.currentTarget.parentElement.className;

	  		e.preventDefault();

	  		$('#' + settings.overlayAttrs.id).show()
	  			.find('span').on('click', function(){
	  				$(this).parent().hide();
	  		});

	  		initMap(this);

	  	}

	  	function initMap(el) {
	  		var latlng = $(el).data('latlng').split(","),
	  			myLatlng = new google.maps.LatLng(parseInt(latlng[0]), parseInt(latlng[1])),
	  			mapProp = null,
	  			mapType;

	  		switch (settings.mapOptions.mapTypeId.toLowerCase()) {
	  			case 'satellite':
	  				mapType = google.maps.MapTypeId.SATELLITE;
	  				break;
	  			case 'hybrid':
	  				mapType = google.maps.MapTypeId.HYBRID;
	  				break;
	  			case 'terrain':
	  				mapType = google.maps.MapTypeId.TERRAIN;
	  				break;
	  			default:
	  				mapType = google.maps.MapTypeId.ROADMAP;
	  		}

	  		mapProp = {
	  		  center: myLatlng,
	  		  zoom: settings.mapOptions.zoom,
	  		  mapTypeId: mapType
	  		};

	  		createMap(mapProp);

	  	}

	  	function createMap(props) {
	  		var map = new google.maps.Map(document.getElementById(settings.mapContainerAttrs.id), props);
	  	}

	  	function createWrappers(index) {
	  		$(this).wrap("<a href='#' class='mapit" + index + "'></a>");
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
