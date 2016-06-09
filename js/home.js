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

	// Venue Section Height
	var venue_h = windowHeight - 130;
	$( '#front-page-6 .solid-section' ) .css({'height': venue_h +'px'});
	$( '#front-page-6 iframe' ) . css({'height': venue_h +'px'});

	// Scroll to Venue section
	var venuesection = $('#front-page-6');
	$('li.venue a').click(function(e){
		e.preventDefault();
		$.scrollTo(venuesection,750,{
			offset: -80
		});
	});

	$( window ).resize(function(){

		var windowHeight = $( window ).height();

		$( '.image-section' ) .css({'height': windowHeight +'px'});

	});

});