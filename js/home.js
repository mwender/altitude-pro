/**
 * This script adds the jquery effects to the front page of the Altitude Pro Theme.
 *
 * @package Altitude\JS
 * @author StudioPress
 * @license GPL-2.0+
 */

(function( $ ){

	if (document.location.hash) {
			window.setTimeout(function () {
				document.location.href += '';
			}, 10);
	}

	// Scroll to target function.
	$( 'a[href*="#"]:not([href="#"])' ).click(function() {

		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $( '[name=' + this.hash.slice(1) + ']' );

			if (target.length) {

				$( 'html,body' ).animate({
					scrollTop: target.offset().top
				}, {
					duration: 750,
					complete: function() {
						target.focus();
					}
				});

				return false;

			}
		}

	});

	// Image section height.
	var windowHeight = $( window ).height();

	$( '.image-section' ) .css({'height': windowHeight +'px'});

	$( window ).resize(function(){

		var windowHeight = $( window ).height();

		$( '.image-section' ) .css({'height': windowHeight +'px'});

	});

})(jQuery);
