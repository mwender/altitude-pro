<?php
//* Start the engine
include_once( get_template_directory() . '/lib/init.php' );

//* Setup Theme
include_once( get_stylesheet_directory() . '/lib/theme-defaults.php' );

//* Set Localization (do not remove)
load_child_theme_textdomain( 'altitude', apply_filters( 'child_theme_textdomain', get_stylesheet_directory() . '/languages', 'altitude' ) );

//* Add Image upload and Color select to WordPress Theme Customizer
require_once( get_stylesheet_directory() . '/lib/customize.php' );

//* Include Customizer CSS
include_once( get_stylesheet_directory() . '/lib/output.php' );

//* Child theme (do not remove)
define( 'CHILD_THEME_NAME', 'Altitude Pro Theme' );
define( 'CHILD_THEME_URL', 'http://my.studiopress.com/themes/altitude/' );
define( 'CHILD_THEME_VERSION', '1.0.0' );

//* Enqueue scripts and styles
add_action( 'wp_enqueue_scripts', 'altitude_enqueue_scripts_styles' );
function altitude_enqueue_scripts_styles() {

	wp_enqueue_script( 'altitude-global', get_bloginfo( 'stylesheet_directory' ) . '/js/global.js', array( 'jquery' ), '1.0.0' );

	wp_enqueue_style( 'dashicons' );
	wp_enqueue_style( 'altitude-google-fonts', '//fonts.googleapis.com/css?family=Ek+Mukta:200,800', array(), CHILD_THEME_VERSION );

}

//* Add HTML5 markup structure
add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );

//* Add viewport meta tag for mobile browsers
add_theme_support( 'genesis-responsive-viewport' );

//* Add new image sizes
add_image_size( 'featured-page', 1140, 400, TRUE );

//* Add support for 1-column footer widget area
add_theme_support( 'genesis-footer-widgets', 1 );

//* Add support for footer menu
add_theme_support ( 'genesis-menus' , array ( 'primary' => 'Primary Navigation Menu', 'secondary' => 'Secondary Navigation Menu', 'footer' => 'Footer Navigation Menu' ) );

//* Unregister the header right widget area
unregister_sidebar( 'header-right' );

//* Reposition the primary navigation menu
remove_action( 'genesis_after_header', 'genesis_do_nav' );
add_action( 'genesis_header', 'genesis_do_nav', 12 );

//* Remove output of primary navigation right extras
remove_filter( 'genesis_nav_items', 'genesis_nav_right', 10, 2 );
remove_filter( 'wp_nav_menu_items', 'genesis_nav_right', 10, 2 );

//* Reposition the secondary navigation menu
remove_action( 'genesis_after_header', 'genesis_do_subnav' );
add_action( 'genesis_header', 'genesis_do_subnav', 5 );

//* Add secondary-nav class if secondary navigation is used
add_filter( 'body_class', 'altitude_secondary_nav_class' );
function altitude_secondary_nav_class( $classes ) {

	$menu_locations = get_theme_mod( 'nav_menu_locations' );

	if ( ! empty( $menu_locations['secondary'] ) ) {
		$classes[] = 'secondary-nav';
	}
	return $classes;

}

//* Hook menu in footer
add_action( 'genesis_footer', 'rainmaker_footer_menu', 7 );
function rainmaker_footer_menu() {
	printf( '<nav %s>', genesis_attr( 'nav-footer' ) );
	wp_nav_menu( array(
		'theme_location' => 'footer',
		'container'      => false,
		'depth'          => 1,
		'fallback_cb'    => false,
		'menu_class'     => 'genesis-nav-menu',	
	) );
	
	echo '</nav>';
}

//* Unregister layout settings
genesis_unregister_layout( 'content-sidebar-sidebar' );
genesis_unregister_layout( 'sidebar-content-sidebar' );
genesis_unregister_layout( 'sidebar-sidebar-content' );

//* Unregister secondary sidebar
unregister_sidebar( 'sidebar-alt' );

//* Add support for custom header
add_theme_support( 'custom-header', array(
	'flex-height'     => true,
	'width'           => 360,
	'height'          => 76,
	'header-selector' => '.site-title a',
	'header-text'     => false,
) );

//* Add support for structural wraps
add_theme_support( 'genesis-structural-wraps', array(
	'header',
	'nav',
	'subnav',
	'footer-widgets',
	'footer',
) );

//* Modify the size of the Gravatar in the author box
add_filter( 'genesis_author_box_gravatar_size', 'altitude_author_box_gravatar' );
function altitude_author_box_gravatar( $size ) {

	return 176;

}

//* Modify the size of the Gravatar in the entry comments
add_filter( 'genesis_comment_list_args', 'altitude_comments_gravatar' );
function altitude_comments_gravatar( $args ) {

	$args['avatar_size'] = 120;
	return $args;

}

//* Remove comment form allowed tags
add_filter( 'comment_form_defaults', 'altitude_remove_comment_form_allowed_tags' );
function altitude_remove_comment_form_allowed_tags( $defaults ) {

	$defaults['comment_field'] = '<p class="comment-form-comment"><label for="comment">' . _x( 'Comment', 'noun', 'altitude' ) . '</label> <textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p>';
	$defaults['comment_notes_after'] = '';	
	return $defaults;

}

//* Add support for after entry widget
add_theme_support( 'genesis-after-entry-widget-area' );

//* Relocate after entry widget
remove_action( 'genesis_after_entry', 'genesis_after_entry_widget_area' );
add_action( 'genesis_after_entry', 'genesis_after_entry_widget_area', 5 );

//* Setup widget counts
function altitude_count_widgets( $id ) {
	global $sidebars_widgets;

	if ( isset( $sidebars_widgets[ $id ] ) ) {
		return count( $sidebars_widgets[ $id ] );
	}

}

function altitude_widget_area_class( $id ) {
	$count = altitude_count_widgets( $id );

	$class = '';
	
	if( $count == 1 ) {
		$class .= ' widget-full';
	} elseif( $count % 3 == 1 ) {
		$class .= ' widget-thirds';
	} elseif( $count % 4 == 1 ) {
		$class .= ' widget-fourths';
	} elseif( $count % 2 == 0 ) {
		$class .= ' widget-halves uneven';
	} else {	
		$class .= ' widget-halves';
	}
	return $class;
	
}

//* Relocate the post info
remove_action( 'genesis_entry_header', 'genesis_post_info', 12 );
add_action( 'genesis_entry_header', 'genesis_post_info', 5 );

//* Customize the entry meta in the entry header
add_filter( 'genesis_post_info', 'altitude_post_info_filter' );
function altitude_post_info_filter( $post_info ) {

    $post_info = '[post_date format="M d Y"] [post_edit]';
    return $post_info;

}

//* Customize the entry meta in the entry footer
add_filter( 'genesis_post_meta', 'altitude_post_meta_filter' );
function altitude_post_meta_filter( $post_meta ) {

	$post_meta = 'Written by [post_author_posts_link] [post_categories before=" &middot; Categorized: "]  [post_tags before=" &middot; Tagged: "]';
	return $post_meta;
	
}

//* Register widget areas
genesis_register_sidebar( array(
	'id'          => 'front-page-1',
	'name'        => __( 'Front Page 1', 'altitude' ),
	'description' => __( 'This is the front page 1 section.', 'altitude' ),
) );
genesis_register_sidebar( array(
	'id'          => 'front-page-2',
	'name'        => __( 'Front Page 2', 'altitude' ),
	'description' => __( 'This is the front page 2 section.', 'altitude' ),
) );
genesis_register_sidebar( array(
	'id'          => 'front-page-3',
	'name'        => __( 'Front Page 3', 'altitude' ),
	'description' => __( 'This is the front page 3 section.', 'altitude' ),
) );
genesis_register_sidebar( array(
	'id'          => 'front-page-4',
	'name'        => __( 'Front Page 4', 'altitude' ),
	'description' => __( 'This is the front page 4 section.', 'altitude' ),
) );
genesis_register_sidebar( array(
	'id'          => 'front-page-5',
	'name'        => __( 'Front Page 5', 'altitude' ),
	'description' => __( 'This is the front page 5 section.', 'altitude' ),
) );
genesis_register_sidebar( array(
	'id'          => 'front-page-6',
	'name'        => __( 'Front Page 6', 'altitude' ),
	'description' => __( 'This is the front page 6 section.', 'altitude' ),
) );
genesis_register_sidebar( array(
	'id'          => 'front-page-7',
	'name'        => __( 'Front Page 7', 'altitude' ),
	'description' => __( 'This is the front page 7 section.', 'altitude' ),
) );
