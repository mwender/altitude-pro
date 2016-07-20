<?php
namespace AltitudePro\lib\fns;

/**
 * Returns HTML stored in lib/html/
 *
 * @since 1.0.0
 *
 * @return string Specify the HTML to retrieve.
 */
add_shortcode( 'htmlinc', __NAMESPACE__ . '\\html_include' );
function html_include( $atts ){
	extract( \shortcode_atts( array(
		'html' => 'name-of-your-html-file',
		'doshortcodes' => true,
	), $atts ) );

	$file = dirname( __FILE__ ) . '/../html/' . $html . '.html';

	$return = ( file_exists( $file ) )? file_get_contents( $file ) : '<p class="alert"><strong>ERROR:</strong> I could not find <code>' . basename( $file ) . '</code>.</p>' ;

	$search = array( '{themedir}' );
	$replace = array( \trailingslashit( get_stylesheet_directory_uri() ) );
	$return = str_replace( $search, $replace, $return );

	if( true == $doshortcodes )
		$return = \do_shortcode( $return );

	return $return;
}

/**
 * A WordPress navigation menu.
 *
 * @since 1.0.2
 *
 * @return string WordPress nav menu.
 */
add_shortcode( 'navmenu', __NAMESPACE__ . '\\get_navmenu' );
function get_navmenu( $atts ){
	if( empty( $atts['menu'] ) )
		return '<p><strong>ERROR:</strong> Please specify a <code>menu</code>.</p>';

	$args = \shortcode_atts( array(
		'menu' 				=> null,
		'menu_class' 		=> 'menu',
		'menu_id' 			=> null,
		'container' 		=> 'div',
		'container_class' 	=> null,
	), $atts );
	$args['echo'] = false;

	return \wp_nav_menu( $args );
}

/**
 * Adds Stripe Checkout buttons.
 *
 * @since 1.0.2
 *
 * @return string Stripe Checkout button.
 */
add_shortcode( 'stripebutton', __NAMESPACE__ . '\\get_stripe_checkout_button' );
function get_stripe_checkout_button( $atts ){
	$args = \shortcode_atts( array(
		'amount' => null,
		'description' => '2 widgets',
		'test' => true,
		'label' => 'Pay with Card',
	), $atts );

	if( is_null( $args['amount'] ) )
		return '<div class="alert error">No amount set!</div>';

	$data_key = ( false == $args['test'] )? 'pk_test_AftOSvbE7T6qcstSEj8CwsMX' : 'pk_live_wGZSP6w8nlMbjxNgkE48Q8kh' ;
	$amount = $args['amount'];
	$description = $args['description'];
	$label = $args['label'];

$button = <<<EOD
<form action="/charge" method="POST">
  <script
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="$data_key"
    data-amount="$amount"
    data-name="Sword & Shield Enterprise Security, Inc."
    data-description="$description"
    data-image="https://s3.amazonaws.com/stripe-uploads/acct_16TIPlEVDPWDYNmamerchant-icon-1465585123147-edge-favicon.256x256.png"
    data-locale="auto"
    data-label="$label"
    data-billing-address="true"
    data-zip-code="true">
  </script>
</form>
EOD;

	return $button;
}
?>