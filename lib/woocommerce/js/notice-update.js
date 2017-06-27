/**
 * This script adds notice dismissal to the Altitude Pro theme.
 *
 * @package Altitude\JS
 * @author StudioPress
 * @license GPL-2.0+
 */

jQuery(document).on( 'click', '.altitude-woocommerce-notice .notice-dismiss', function() {

	jQuery.ajax({
		url: ajaxurl,
		data: {
			action: 'altitude_dismiss_woocommerce_notice'
		}
	});

});