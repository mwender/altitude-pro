<?php
/*
 Template Name: Full width top section
 */

add_action( 'genesis_header', 'full_width_top_section',99 );
function full_width_top_section(){
  echo '<div class="top-section clearfix"><div class="gradient">' . AltitudePro\lib\fns\html_include( ['html' => 'top-section'] ) . '</div></div>';
}

genesis();
