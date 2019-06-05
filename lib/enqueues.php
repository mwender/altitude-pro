<?php

namespace UWGK\enqueues;

/**
 * Enqueue scripts and styles
 */
function enqueue_scripts_styles() {

  wp_enqueue_script( 'altitude-global', get_stylesheet_directory_uri() . '/js/global.js', array( 'jquery' ), '1.0.0' );

  wp_enqueue_style( 'dashicons' );
  wp_enqueue_style( 'altitude-google-fonts', '//fonts.googleapis.com/css?family=Ek+Mukta:200,800', array(), CHILD_THEME_VERSION );

  //* Remove default style.css, add /lib/main.css
  $handle  = defined( 'CHILD_THEME_NAME' ) && CHILD_THEME_NAME ? sanitize_title_with_dashes( CHILD_THEME_NAME ) : 'child-theme';
  wp_deregister_style( $handle );

  wp_enqueue_style( $handle, get_bloginfo( 'stylesheet_directory' ) . '/lib/css/main.css', false, filemtime( get_stylesheet_directory() . '/lib/css/main.css' ) );

  $suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
  wp_enqueue_script( 'altitude-responsive-menu', get_stylesheet_directory_uri() . '/js/responsive-menus' . $suffix . '.js', array( 'jquery' ), CHILD_THEME_VERSION, true );
  wp_localize_script(
    'altitude-responsive-menu',
    'genesis_responsive_menu',
    altitude_responsive_menu_settings()
  );

}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts_styles' );