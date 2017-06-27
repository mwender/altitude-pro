<?php
/**
 * Altitude Pro.
 *
 * This file adds the theme helper functions to the Altitude Pro Theme.
 *
 * @package Altitude
 * @author  StudioPress
 * @license GPL-2.0+
 * @link    http://my.studiopress.com/themes/altitude/
 */

/**
 * Get default link color for Customizer.
 * Abstracted here since at least two functions use it.
 *
 * @since 1.1.0
 *
 * @return string Hex color code for accent color.
 */
function altitude_customizer_get_default_link_color() {
	return '#22a1c4';
}

/**
 * Get default accent color for Customizer.
 * Abstracted here since at least two functions use it.
 *
 * @since 1.1.0
 *
 * @return string Hex color code for accent color.
 */
function altitude_customizer_get_default_accent_color() {
	return '#22a1c4';
}

/**
 * Calculate the color contrast.
 *
 * @since 1.1.0
 *
 * @return string Hex value of the contrasting color.
 */
function altitude_color_contrast( $color ) {

	$hexcolor = str_replace( '#', '', $color );
	$red      = hexdec( substr( $hexcolor, 0, 2 ) );
	$green    = hexdec( substr( $hexcolor, 2, 2 ) );
	$blue     = hexdec( substr( $hexcolor, 4, 2 ) );

	$luminosity = ( ( $red * 0.2126 ) + ( $green * 0.7152 ) + ( $blue * 0.0722 ) );

	return ( $luminosity > 128 ) ? '#000000' : '#ffffff';

}

/**
 * Calculate color brightness.
 *
 * @since 1.1.0
 *
 * @return string Hex value of the new color brightness.
 */
function altitude_color_brightness( $color, $change ) {

	$hexcolor = str_replace( '#', '', $color );

	$red   = hexdec( substr( $hexcolor, 0, 2 ) );
	$green = hexdec( substr( $hexcolor, 2, 2 ) );
	$blue  = hexdec( substr( $hexcolor, 4, 2 ) );

	$red   = max( 0, min( 255, $red + $change ) );
	$green = max( 0, min( 255, $green + $change ) );
	$blue  = max( 0, min( 255, $blue + $change ) );

	return '#'.dechex( $red ).dechex( $green ).dechex( $blue );

}

/**
 * Change color brightness.
 *
 * @since 3.2.0
 */
function altitude_change_brightness( $color ) {

	$hexcolor = str_replace( '#', '', $color );

	$red   = hexdec( substr( $hexcolor, 0, 2 ) );
	$green = hexdec( substr( $hexcolor, 2, 2 ) );
	$blue  = hexdec( substr( $hexcolor, 4, 2 ) );

	$luminosity = ( ( $red * 0.2126 ) + ( $green * 0.7152 ) + ( $blue * 0.0722 ) );

	return ( $luminosity > 128 ) ? altitude_color_brightness( '#333333', 70 ) : altitude_color_brightness( '#ffffff', -50 );

}
