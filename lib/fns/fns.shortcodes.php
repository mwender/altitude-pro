<?php
/**
 * Returns DJ Intelligence Availability Form HTML
 *
 * @since 1.0.0
 *
 * @return string Availability form HTML.
 */
add_shortcode( 'djint', 'djint_availability' );
function djint_availability( $atts ){
	extract( shortcode_atts( array(
		'form' => 'availability',
	), $atts ) );

	switch ( strtolower( $form ) ) {
		default:
			$html = file_get_contents( dirname( __FILE__ ) . '/../html/djint-availability.html' );
			break;
	}

	return $html;
}

?>