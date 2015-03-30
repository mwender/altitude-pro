<?php
/* 
 * Adds the required CSS to the front end.
 */

add_action( 'wp_enqueue_scripts', 'altitude_css' );
/**
* Checks the settings for the images and background colors for each image
* If any of these value are set the appropriate CSS is output
*
* @since 1.0
*/
function altitude_css() {

	$handle  = defined( 'CHILD_THEME_NAME' ) && CHILD_THEME_NAME ? sanitize_title_with_dashes( CHILD_THEME_NAME ) : 'child-theme';

	$color = get_theme_mod( 'altitude_accent_color', altitude_customizer_get_default_accent_color() );

	$opts = apply_filters( 'altitude_images', array( '1', '3', '5', '7' ) );

	$settings = array();

	foreach( $opts as $opt ){
		$settings[$opt]['image'] = preg_replace( '/^https?:/', '', get_option( $opt .'-altitude-image', sprintf( '%s/images/bg-%s.jpg', get_stylesheet_directory_uri(), $opt ) ) );
	}

	$css = '';

	foreach ( $settings as $section => $value ) {

		$background = $value['image'] ? sprintf( 'background-image: url(%s);', $value['image'] ) : '';

		if( is_front_page() ) {
			$css .= ( ! empty( $section ) && ! empty( $background ) ) ? sprintf( '.front-page-%s { %s }', $section, $background ) : '';
		}

	}

	$css .= ( altitude_customizer_get_default_accent_color() !== $color ) ? sprintf( '
		a,
		.entry-title a:hover,
		.image-section a:hover,
		.image-section .featured-content .entry-title a:hover,
		.site-footer a:hover {
			color: %1$s;
		}

		button,
		input[type="button"],
		input[type="reset"],
		input[type="submit"],
		.archive-pagination li a:hover,
		.archive-pagination .active a,
		.button,
		.footer-widgets,
		.widget .button {
			background-color: %1$s;
		}

		button,
		input[type="button"],
		input[type="reset"],
		input[type="submit"],
		.button,
		.front-page input:focus,
		.front-page textarea:focus,
		.widget .button {
			border-color: %1$s;
		}
		', $color ) : '';

	if( $css ){
		wp_add_inline_style( $handle, $css );
	}

}
