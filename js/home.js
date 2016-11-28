jQuery(function( $ ){

	if (document.location.hash) {
			window.setTimeout(function () {
				document.location.href += '';
			}, 10);
	}

	// Local Scroll Speed
	$.localScroll({
		duration: 750,
		offset: -50
	});

	// Image Section Height
	var windowHeight = $( window ).height();

	$( '.image-section.fullheight' ) .css({'height': windowHeight +'px'});

	$( window ).resize(function(){

		var windowHeight = $( window ).height();

		$( '.image-section.fullheight' ) .css({'height': windowHeight +'px'});

	});

});