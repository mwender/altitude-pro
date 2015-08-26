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
		'html' => 'name-of-your-html-file',
	), $atts ) );

	$file = dirname( __FILE__ ) . '/../html/' . $html . '.html';

	$return = ( file_exists( $file ) )? file_get_contents( $file ) : '<p class="alert"><strong>ERROR:</strong> I could not find <code>' . basename( $file ) . '</code>.</p>' ;

	if( 'djint-availability-top' == $html )
		wp_enqueue_script( 'availability-checker' );

	return $return;
}

?>