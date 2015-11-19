(function($){
	'use strict';

	$.fn.mapit = function(options) {

		//load Google API
		$.getScript('http://maps.googleapis.com/maps/api/js');

		//defaults
		var defaults = {
			width: 500,
			height: 400,
			mapOptions: {
				zoom: 8,
				mapType: 'ROADMAP',
			},
			overlayAttrs: {
				id: 'mapit-overlay'
			},
			overlayCSS: {
				zindex : 1000,
				borderStyle : 'solid',
				borderWidth : '1px',
				borderColor: '#000',
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

		//extending settings with defaults and options from user
		var settings = $.extend(true, {}, defaults, options);

		//create overlay div to insert maps
		createOverlay();

	  	return this.each(function(index, element) {
	
	  		//click listener
	  		$(this).on('click', clickHandler);

	  	});

	  	function clickHandler(e) {

	  		e.preventDefault();

	  		$('#' + settings.overlayAttrs.id).slideDown(100)
	  			.find('span').on('click', function(){
	  				$(this).parent().hide();
	  		});

	  		//initialize the Map
	  		initMap(this);

	  	}

	  	function initMap(el) {
	  		var latlng = $(el).data('latlng').split(","),
	  			myLatlng = new google.maps.LatLng(parseInt(latlng[0]), parseInt(latlng[1])),
	  			mapProps = null,
	  			mapType;

	  		switch (settings.mapOptions.mapType.toLowerCase()) {
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

	  		mapProps = {
	  		  center: myLatlng,
	  		  zoom: settings.mapOptions.zoom,
	  		  mapTypeId: mapType
	  		};

	  		//create Map
	  		var map = new google.maps.Map(document.getElementById(settings.mapContainerAttrs.id), mapProps);

	  	}

	  	//creates Overlay and appends to document
	  	function createOverlay(){

			var overlay = $('<div />')
				.attr(settings.overlayAttrs)
				.css({
				'display': 'none',
				'position' : 'fixed',
				'left' : 50 + '%',
				'top' : 50 + '%',
				'margin-top' : '-' + settings.height/2 + 'px',
				'margin-left' : '-' + settings.width/2 + 'px',
				'z-index' : settings.overlayCSS.zindex,
				'border-style' : settings.overlayCSS.borderStyle,
				'border-width' : settings.overlayCSS.borderWidth,
				'border-color' : settings.overlayCSS.borderColor,
				'outline' : '9999px solid rgba(0,0,0,0.7)'
			});

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
