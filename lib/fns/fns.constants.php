<?php
namespace AltitudePro\constants;

add_action( 'init', __NAMESPACE__ . '\\child_constants', 10 );
/**
 * Defines the child theme constants
 *
 * @since 1.6.0
 */
function child_constants(){
    $child_url = get_stylesheet_directory_uri();
    define( 'CHILD_LIB_URL', $child_url . '/lib' );
    define( 'CHILD_ADMIN_URL', CHILD_LIB_URL . '/admin' );
    define( 'CHILD_ADMIN_IMAGES_URL', CHILD_LIB_URL . '/admin/images' );
}