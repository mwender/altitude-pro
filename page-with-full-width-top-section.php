<?php
/*
 Template Name: Full width top section
 */

add_action( 'genesis_header', 'full_width_top_section',99 );
function full_width_top_section(){
	echo '<div class="top-section"><div class="gradient">' . do_shortcode( '[htmlinc html="top-section" /]' ) . '</div></div>';
}

genesis();
