<?php

//* Altitude Theme Setting Defaults
add_filter( 'genesis_theme_settings_defaults', 'altitude_theme_defaults' );
function altitude_theme_defaults( $defaults ) {

	$defaults['blog_cat_num']              = 5;
	$defaults['content_archive']           = 'full';
	$defaults['content_archive_limit']     = 0;
	$defaults['content_archive_thumbnail'] = 0;
	$defaults['posts_nav']                 = 'numeric';
	$defaults['site_layout']               = 'full-width-content';

	return $defaults;

}

//* Altitude Theme Setup
add_action( 'after_switch_theme', 'altitude_theme_setting_defaults' );
function altitude_theme_setting_defaults() {

	if( function_exists( 'genesis_update_settings' ) ) {

		genesis_update_settings( array(
			'blog_cat_num'              => 5,	
			'content_archive'           => 'full',
			'content_archive_limit'     => 0,
			'content_archive_thumbnail' => 0,
			'posts_nav'                 => 'numeric',
			'site_layout'               => 'full-width-content',
		) );
		
	} 

	update_option( 'posts_per_page', 5 );

}

//* Simple Social Icon Defaults
add_filter( 'simple_social_default_styles', 'altitude_social_default_styles' );
function altitude_social_default_styles( $defaults ) {

	$args = array(
		'alignment'              => 'aligncenter',
		'background_color'       => '#000000',
		'background_color_hover' => '#222222',
		'border_radius'          => 4,
		'icon_color'             => '#ffffff',
		'icon_color_hover'       => '#ffffff',
		'size'                   => 40,
		);
		
	$args = wp_parse_args( $args, $defaults );
	
	return $args;
	
}