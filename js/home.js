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

	// Resize package columns to match 3rd column, above 1023px media query breakpoint
	function resizePlans(){
		var windowWidth = $( window ).width();

		if( 1023 < windowWidth ){
			var last_widget_h = $( '#plans .widget:last-child' ).height();
			var last_ul_h = $( '#plans .widget:last-child ul' ).height();
			console.log('last_widget_h = ' + last_widget_h + "\nlast_ul_h = " + last_ul_h );
			for( x = 2; x < 5; x++ ){
				$( '#plans .widget:nth-of-type(' + x + ')' ).height( last_widget_h );
				$( '#plans .widget:nth-of-type(' + x + ') ul' ).height( last_ul_h + 10 );
			}
		}
	}
	resizePlans();

	$( window ).resize(function(){
		resizePlans();
	});


});