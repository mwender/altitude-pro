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
		'doshortcodes' => true,
	), $atts ) );

	$file = dirname( __FILE__ ) . '/../html/' . $html . '.html';

	$return = ( file_exists( $file ) )? file_get_contents( $file ) : '<p class="alert"><strong>ERROR:</strong> I could not find <code>' . basename( $file ) . '</code>.</p>' ;

	$search = array( '{themedir}' );
	$replace = array( trailingslashit( get_stylesheet_directory_uri() ) );
	$return = str_replace( $search, $replace, $return );

	if( true == $doshortcodes )
		$return = do_shortcode( $return );

	return $return;
}

/**
 * A WordPress navigation menu.
 *
 * @since 1.0.2
 *
 * @return string WordPress nav menu.
 */
add_shortcode( 'navmenu', 'ap_get_navmenu' );
function ap_get_navmenu( $atts ){
	if( empty( $atts['menu'] ) )
		return '<p><strong>ERROR:</strong> Please specify a <code>menu</code>.</p>';

	$args = shortcode_atts( array(
		'menu' 				=> null,
		'menu_class' 		=> 'menu',
		'menu_id' 			=> null,
		'container' 		=> 'div',
		'container_class' 	=> null,
	), $atts );
	$args['echo'] = false;

	return wp_nav_menu( $args );
}

?>