<?php
/**
 * This file adds the Tabbed template to the Altitude Pro Theme.
 *
 * @author StudioPress
 * @package Altitude
 * @subpackage Customizations
 */

/*
Template Name: Tabs
*/

//* Add custom body class to the head
function altitude_add_body_class( $classes ) {

   $classes[] = 'tabbed-content';
   return $classes;

}
add_filter( 'body_class', 'altitude_add_body_class' );

// Enqueue the JS to power the tabs
function altitude_enqueue_tab_scripts(){
    wp_enqueue_style( 'jquery-ui-tabs', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css' );
    wp_enqueue_script( 'altitude-tabs', get_stylesheet_directory_uri() . '/js/tabs.js', ['jquery','jquery-ui-tabs'], filemtime( dirname( __FILE__ ) . '/js/tabs.js' ), true );
}
add_action( 'wp_enqueue_scripts', 'altitude_enqueue_tab_scripts' );

// Add tabbed content to the page body
function altitude_tabbed_content(){
    if( have_rows('tabbed_content') ){
        $tabs = [];
        $tab_contents = [];

        while( have_rows('tabbed_content') ) : the_row();
            $tab_title = get_sub_field('tab_title');
            $tabs[] = [ 'slug' => sanitize_title_with_dashes( $tab_title, '', 'save' ), 'title' => $tab_title ];
            $tab_contents[] = get_sub_field('tab_content');
        endwhile;
?>
        <div id="tabs">
            <ul>
                <?php
                foreach ( $tabs as $tab ) {
                    echo '<li><a href="#' . $tab['slug'] . '">' . $tab['title'] . '</a></li>';
                }
                ?>
            </ul>
            <?php
            foreach( $tab_contents as $key => $content ){
                echo '<div id="' . $tabs[$key]['slug'] . '">' . $content .'</div>';
            }
            ?>
        </div>
<?php
    } else {
        the_content();
    }
}
add_action( 'genesis_entry_content', 'altitude_tabbed_content' );
remove_action( 'genesis_entry_content', 'genesis_do_post_image', 8 );
remove_action( 'genesis_entry_content', 'genesis_do_post_content' );

//* Force full width content layout
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// This file handles pages, but only exists for the sake of child theme forward compatibility.
genesis();
