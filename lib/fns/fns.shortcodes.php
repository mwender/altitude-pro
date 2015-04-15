<?php
/**
 * Returns HTML stored in lib/html/
 *
 * @since 1.0.0
 *
 * @return string Specify the HTML to retrieve.
 */
add_shortcode( 'htmlinc', 'html_include' );
function html_include( $atts ){
	extract( shortcode_atts( array(
		'html' => 'availability',
	), $atts ) );

	switch ( strtolower( $html ) ) {
		case 'awards':
			$html = file_get_contents( dirname( __FILE__ ) . '/../html/wedding-wire-awards.html' );
			break;
		default:
			$html = file_get_contents( dirname( __FILE__ ) . '/../html/djint-availability.html' );
			break;
	}

	return $html;
}

?>