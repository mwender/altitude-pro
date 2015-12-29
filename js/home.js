jQuery(function( $ ){

	if (document.location.hash) {
			window.setTimeout(function () {
				document.location.href += '';
			}, 10);
	}

	// Local Scroll Speed
	$.localScroll({
		duration: 750
	});

	// Image Section Height
	var windowHeight = $( window ).height();

	$( '.image-section' ) .css({'height': windowHeight +'px'});
		
	$( window ).resize(function(){
	
		var windowHeight = $( window ).height();
	
		$( '.image-section' ) .css({'height': windowHeight +'px'});
	
	});

});