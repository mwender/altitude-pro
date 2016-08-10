<?php
namespace Genesis\AltitudePro\fns\header;

function edge2016_social_image(){
?>
<img id="edge2016-social-image" src="<?php  echo get_stylesheet_directory_uri() . '/images/edge2016-social-thumbnail.1400x655.jpg' ?>" alt="EDGE2016" style="position: absolute; top: 0; left: -9999px;" />
<?php
}
add_action( 'genesis_before_header', __NAMESPACE__ . '\\edge2016_social_image', 5 );
?>