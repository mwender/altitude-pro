jQuery(function( $ ){
	// Venue Section Height
	var venue_h = windowHeight - 99;
	var venueScrollOffset = -49;

	// Adjust Venue offset and section height
	// if .admin-bar is showing.
	if( true == wp.adminBar ){
		venue_h = venue_h - 31;
		venueScrollOffset = venueScrollOffset - 31;
	}

	var windowWidth = $( window ).width();
	if( 1229 < windowWidth ){
		$( '#front-page-6 .solid-section' ) .css({'height': venue_h + 'px'});
	}

	$( '#front-page-6 iframe' ) . css({'height': venue_h + 'px'});
	$( '#front-page-6 .overlay' ) . css({'height': venue_h + 'px', 'top': venue_h + 'px', 'margin-top': '-' + venue_h + 'px'});
	$( '#front-page-6 #read-more' ).on( 'click', function(){
		$( '#front-page-6 .solid-section' ) .css({'height': 'auto' });
	} );

	// Scroll to Venue section
	var venuesection = $('#front-page-6');
	$('li.venue a').click(function(e){
		e.preventDefault();
		$.scrollTo(venuesection,750,{
			offset: venueScrollOffset
		});
	});
});