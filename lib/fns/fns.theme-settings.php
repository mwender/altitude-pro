<?php
/**
 * Register Defaults
 * @author Bill Erickson
 * @link http://www.billerickson.net/genesis-theme-options/
 *
 * @param array $defaults
 * @return array modified defaults
 *
 */
function google_cal_defaults( $defaults ) {

	$defaults['google_api_key'] = '';
	$defaults['google_cal_id'] = '';

	return $defaults;
}
add_filter( 'genesis_theme_settings_defaults', 'google_cal_defaults' );

/**
 * Sanitization
 * Register our two new option values with the no_html sanitization type defined within Genesis.
 *
 * @author Bill Erickson
 * @link http://www.billerickson.net/genesis-theme-options/
 *
 */
function google_cal_sanitization_filters() {
	genesis_add_option_filter(
		'no_html',
		GENESIS_SETTINGS_FIELD,
		array(
			'available_redirect_url',
			'google_api_key',
			'google_cal_id',
		)
	);
}
add_action( 'genesis_settings_sanitizer_init', 'google_cal_sanitization_filters' );

/**
 * Register additional metaboxes to Genesis > Theme Settings
 * @author Bill Erickson
 * @link http://www.billerickson.net/genesis-theme-options/
 *
 * @param string $_genesis_theme_settings_pagehook
 */
function register_google_cal_settings_box( $_genesis_theme_settings_pagehook ) {
	add_meta_box( 'google-cal-settings', 'Google Calendar Integration', 'google_cal_settings_box', $_genesis_theme_settings_pagehook, 'main', 'high' );
}
add_action( 'genesis_theme_settings_metaboxes', 'register_google_cal_settings_box' );

/**
 * Social Settings Metabox Callback
 * @see be_register_social_settings_box()
 * @author Bill Erickson
 * @link http://www.billerickson.net/genesis-theme-options/
 *
 */

function google_cal_settings_box() {
	?>
	<p><?php _e( '"Availabile" Redirect:', 'be-genesis-child' );?><br />
	<input type="text" name="<?php echo GENESIS_SETTINGS_FIELD; ?>[available_redirect_url]" value="<?php echo esc_attr( genesis_get_option('available_redirect_url') ); ?>" size="90" /><br />Enter the URL of the page where you want to redirect users when you're available.</p>

	<p><?php _e( 'Google API Key:', 'be-genesis-child' );?><br />
	<input type="text" name="<?php echo GENESIS_SETTINGS_FIELD; ?>[google_api_key]" value="<?php echo esc_attr( genesis_get_option('google_api_key') ); ?>" size="90" /><br /><a href="https://console.developers.google.com/project" target="_blank">Get a Google API Key &rarr;</a></p>

	<p><?php _e( 'Google Calendar ID:', 'be-genesis-child' );?><br />
	<input type="text" name="<?php echo GENESIS_SETTINGS_FIELD; ?>[google_cal_id]" value="<?php echo esc_attr( genesis_get_option('google_cal_id') ); ?>" size="90" />
	</p>
	<div style="margin: 0 20px 0 40px; border: 1px solid #ccc; background: #eee; padding: 0 10px 10px 10px; border-radius: 3px;"><p>Access your Google Calendar's settings to find its Calendar ID:</p>
	<a href="<?php bloginfo( 'stylesheet_directory' ) ?>/images/google-calendar-id.jpg" target="_blank"><img src="<?php bloginfo( 'stylesheet_directory' ) ?>/images/google-calendar-id.jpg" style="width: 100%;" /></a></div>

	<?php
}