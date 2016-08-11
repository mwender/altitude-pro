<?php
namespace Genesis\AltitudePro\fns\opengraph;

/**
 * Sets default Open Graph image for use when sharing on social networks
 *
 * @return void
 */
function open_graph_image(){
?>
<meta property="og:image" content="<?php  echo get_stylesheet_directory_uri() ?>/images/edge2016-social-thumbnail.1400x655.jpg">
<?php
}
add_action( 'wp_head', __NAMESPACE__ . '\\open_graph_image', 5 );
?>