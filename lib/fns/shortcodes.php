<?php
namespace Smco\fns;

/**
 * Returns HTML stored in lib/html/
 *
 * @since 1.0.0
 *
 * @return string Specify the HTML to retrieve.
 */
function html_include( $atts ){
	extract( shortcode_atts( array(
		'html' => 'name-of-your-html-file',
	), $atts ) );

	$file = dirname( __FILE__ ) . '/../html/' . $html . '.html';

	$return = ( file_exists( $file ) )? file_get_contents( $file ) : '<p class="alert"><strong>ERROR:</strong> I could not find <code>' . basename( $file ) . '</code>.</p>' ;

	$search = array( '{themedir}' );
	$replace = array( trailingslashit( get_stylesheet_directory_uri() ) );
	$return = str_replace( $search, $replace, $return );

  $return = do_shortcode( $return );

	return $return;
}
add_shortcode( 'htmlinc', __NAMESPACE__  . '\\html_include' );

function pricing_form( $atts ){
	$args = shortcode_atts([
		'form' => null,
		'show' => 'all',
		'introtext' => 'Select your modules and your number of locations. Then you\'ll be able to discuss your quote with us or complete the sign up process by entering your billing information. We\'ll contact you to customize ThriftTrac to meet your specific needs and complete the on-boarding process.',
	], $atts );

	$replace = [];
	if( is_null( $args['form']) || ! is_numeric( $args['form'] ) ){
		$replace['form'] = '<div class="alert alert-warning">Please specify a Gravity Form to include here using <code>form="<em>ID</em>"</code>.</div>';
	} else {
		$replace['form'] = gravity_form( $args['form'], false, false, false, false, true, null, false );
	}
	$replace['display_site-visit'] = '';
	$replace['display_group-coaching'] = '';
	$replace['display_one-on-one-coaching'] = '';
	$replace['display_marketing'] = '';

	$show = ( stristr( $args['show'], ',') )? explode(',', $args['show'] ) : array( $args['show'] );
	foreach( $show as $service ){
		switch ( $service ) {
			case 'site-visit':
			case 'group-coaching':
			case 'one-on-one-coaching':
			case 'marketing':
				$replace['display_' . $service ] = 'display';
				break;

			case 'all':
				$replace['display_marketing'] = 'display';
				$replace['display_group-coaching'] = 'display';
				$replace['display_one-on-one-coaching'] = 'display';
				$replace['display_site-visit'] = 'display';
				break;

			default:
				// nothing
				break;
		}
	}



	wp_enqueue_script( 'pricing', get_stylesheet_directory_uri() . '/js/pricing.js', ['jquery'], filemtime( get_stylesheet_directory() . '/js/pricing.js'), true );
	wp_localize_script( 'pricing', 'wpvars', ['formId' => $args['form']] );

	$file = dirname( __FILE__ ) . '/../html/pricing.html';
	$html = ( file_exists( $file ) )? file_get_contents( $file ) : '<p class="alert"><strong>ERROR:</strong> I could not find <code>' . basename( $file ) . '</code>.</p>' ;

	$search = ['form', 'display_site-visit', 'display_group-coaching', 'display_one-on-one-coaching', 'display_marketing', 'introtext'];
	foreach( $search as $key ){
		$html = str_replace( '{' . $key . '}', $replace[$key], $html );
	}

	return $html;
}
add_shortcode( 'pricingform', __NAMESPACE__ . '\\pricing_form' );


?>