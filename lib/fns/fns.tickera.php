<?php
add_filter( 'gettext', 'replace_tickera_text', 20, 3 );
function replace_tickera_text( $translated_text, $text, $domain ){
	if( is_admin() )
		return $translated_text;

	if( ! is_page() )
		return $translated_text;

	switch ( $translated_text ) {
		case 'Owner Info':
			$translated_text = __( 'Attendee Info', 'altitude_pro' );
			break;

		default:
			break;
	}
	return $translated_text;
}
?>