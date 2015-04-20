jQuery(function( $ ){

	// Local Scroll Speed
	$.localScroll({
		duration: 750
	});

	// Image Section Height
	var windowHeight = $( window ).height();

	$( '.image-section' ) .css({'height': windowHeight +'px'});

	/* Resize package columns to match 3rd column, above 1023px media query breakpoint */
	var windowWidth = $( window ).width();

	if( 1023 < windowWidth ){
		var platinum_widget_h = $( '#front-page-4 section.widget_text:nth-of-type(4)' ).height();
		var platinum_ul_h = $( '#front-page-4 section.widget_text:nth-of-type(4) ul' ).height();
		for( x = 2; x < 4; x++ ){
			$( '#front-page-4 section.widget_text:nth-of-type(' + x + ')' ).height( platinum_widget_h );
			$( '#front-page-4 section.widget_text:nth-of-type(' + x + ') ul' ).height( platinum_ul_h + 10 );
		}
	}


	$( window ).resize(function(){

		var windowHeight = $( window ).height();

		$( '.image-section' ) .css({'height': windowHeight +'px'});

		if( 1023 < windowWidth ){
			var platinum_widget_h = $( '#front-page-4 section.widget_text:nth-of-type(4)' ).height();
			var platinum_ul_h = $( '#front-page-4 section.widget_text:nth-of-type(4) ul' ).height();
			for( x = 2; x < 4; x++ ){
				$( '#front-page-4 section.widget_text:nth-of-type(' + x + ')' ).height( platinum_widget_h );
				$( '#front-page-4 section.widget_text:nth-of-type(' + x + ') ul' ).height( platinum_ul_h + 10 );
			}
		}
	});

});