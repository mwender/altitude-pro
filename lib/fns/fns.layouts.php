<?php
namespace AltitudePro\layouts;

//* Register new layouts
add_action( 'init', __NAMESPACE__ . '\\add_layouts' );
function add_layouts( $layouts ){
    $url = CHILD_ADMIN_IMAGES_URL . '/layouts/';

    \genesis_register_layout( 'full-width-page', [
        'label' => __( 'Full Width', 'altitude' ),
        'img' => $url . 'fw.gif',
    ] );

    \genesis_register_layout( 'full-width-noheading', [
        'label' => __( 'Full Width No Heading', 'altitude' ),
        'img' => $url . 'fw-noheading.gif',
    ] );

    \genesis_register_layout( 'wide-content', [
        'label' => __( 'Wide Content', 'altitude' ),
        'img' => $url . 'wc.gif',
    ] );

    \genesis_register_layout( 'full-width-noheading-withwrap', [
        'label' => __( 'Full Width No Heading with Wrap', 'altitude' ),
        'img' => $url . 'fw-noheading-withwrap.gif',
    ] );
}

add_action( 'genesis_header', __NAMESPACE__ . '\\remove_sidebar', 100 );
function remove_sidebar(){
    $layout = genesis_site_layout();

    $nosidebar = ['full-width-page','full-width-noheading','wide-content','full-width-noheading-withwrap'];

    if( in_array( $layout, $nosidebar ) ){
        remove_action( 'genesis_after_content', 'genesis_get_sidebar', 10 );
        remove_action( 'genesis_after_content_sidebar_wrap', 'genesis_get_sidebar_alt', 10 );
    }
}