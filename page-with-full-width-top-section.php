<?php
/*
 Template Name: Full width top section
 */

function full_width_top_section(){
  global $post;
  $html = ( $top_section = get_post_meta( $post->ID, 'top_section', true ) )? $top_section : 'top-section';
	echo '<div class="top-section"><div class="gradient">' . do_shortcode( '[htmlinc html="' . $html . '" /]' ) . '</div></div>';
}
add_action( 'genesis_header', 'full_width_top_section', 99 );

genesis();