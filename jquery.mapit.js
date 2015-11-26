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
				backgroundColor : 'rgba(0,0,0,0.7)'
			},
			overlayCloseCSS: {
				zindex : 1001,
				top : '-10px',
				right: '-10px',
				width : '25px',
				boxShadow : '1px 1px 2px 0 rgba(0, 0, 0, 0.4)',
				borderRadius : '50%',
				borderWidth: '1px',
				borderColor: : '#fff',
				borderStyle : 'solid',
				backgroundColor : '#000',
				color : '#fff',
				lineHeight : '26px',
				fontFamily : 'Arial'

			},
			mapContainerAttrs: {
				id: 'mapit-wrapper'
			},
			onMapShow: function(){},
			onMapClose: function(){}
		};

		//extending settings with defaults and options from user
		var settings = $.extend(true, {}, defaults, options);

		//create overlay div to insert maps
		createOverlay();

	  	function clickHandler(e) {

	  		e.preventDefault();

	  		$('#' + settings.overlayAttrs.id).slideDown(100)
	  			.find('span').one('click', function(){
	  				$(this).parent().hide();
	  				//onMapClose callback
	  				settings.onMapClose.call(this);
	  		});

	  		//initialize the Map
	  		initMap(this);

	  		//onMapShow callback
	  		settings.onMapShow.call(this);
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
				'outline' : '9999px solid ' + settings.overlayCSS.backgroundColor
			});

			var mapContainer = $('<div />')
				.attr(settings.mapContainerAttrs).css({
					'width' : settings.width + 'px',
					'height' : settings.height + 'px'
				});

			var close = $('<span />').css({
				'position' : 'absolute',
				'display' : 'block',
				'cursor' : 'pointer',
				'text-align' : 'center',
				'font-family' : settings.overlayCloseCSS.fontFamily,
				'line-height' : settings.overlayCloseCSS.lineHeight,
				'background-color' : settings.overlayCloseCSS.backgroundColor,
				'color' : settings.overlayCloseCSS.color,
				'border-width' : settings.overlayCloseCSS.borderWidth,
				'border-style' : settings.overlayCloseCSS.borderStyle,
				'border-color' : settings.overlayCloseCSS.borderColor,
				'border-radius' : settings.overlayCloseCSS.borderRadius,
				'box-shadow' : settings.overlayCloseCSS.boxShadow,
				'top' : settings.overlayCloseCSS.top,
				'right' : settings.overlayCloseCSS.right,
				'width' : settings.overlayCloseCSS.width,
				'z-index' : settings.overlayCloseCSS.zindex
			})
				.append(document.createTextNode("x"));

			$(overlay)
				.append(close)
				.append(mapContainer);
			$("body").append(overlay);
	  	}

	  	
	  	return this.each(function(index, element) {

	  		//click listener
	  		$(this).on('click', clickHandler);

	  	});

	};

}(jQuery));
