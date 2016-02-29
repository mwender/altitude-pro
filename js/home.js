jQuery(function( $ ){

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

	// Resize package columns to match 1st column, above 1023px media query breakpoint
	function resizePlans(){
		var windowWidth = $( window ).width();

		if( 1023 < windowWidth ){
			var widget_h = $( '#plans .widget:nth-child(2)' ).height();
			var ul_h = $( '#plans .widget:nth-child(2) ul' ).height();
			console.log('widget_h = ' + widget_h + "\nul_h = " + ul_h );
			for( x = 2; x < 5; x++ ){
				$( '#plans .widget:nth-of-type(' + x + ')' ).height( widget_h );
				$( '#plans .widget:nth-of-type(' + x + ') ul' ).height( ul_h + 10 );
			}
		}
	}
	resizePlans();

	$( window ).resize(function(){
		resizePlans();
	});


});