<?php

namespace AltitudePro\lib\fns\Blog;


add_action( 'genesis_before_loop', __NAMESPACE__ . '\\configure_blog', 10 );
function configure_blog(){
	if( ! \is_home() )
		return;

	add_action( 'genesis_entry_header', '\\genesis_do_post_image', 6 );
	remove_action( 'genesis_entry_header', 'genesis_post_info', 5 );
	remove_action( 'genesis_entry_content', 'genesis_do_post_image', 8 );
}
?>