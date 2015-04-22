<?php
/**
 * Sets $_GET[‘date’] when Month, Day, and Year $_GET values are set.
 *
 * This is used in conjunction with Gravity Forms to prepopulate a
 * form’s date field via values sent by the DJ Intelligence service.
 *
 * @see Function/method/class relied on
 * @link URL short description.
 * @global int $Month $_GET['Month'].
 * @global int $Day $_GET['Day'].
 * @global int $Year $_GET['Year'].
 *
 * @since 1.0.0
 *
 * @return void
 */
function idoent_set_date_for_form(){
	if( ! isset( $_GET['Month'] ) || ! isset( $_GET['Day'] ) || ! isset( $_GET['Year'] ) )
		return;

	if( ! is_numeric( $_GET['Month'] ) || ! is_numeric( $_GET['Day'] ) || ! is_numeric( $_GET['Year'] ) )
		return;

	$date = $_GET['Month'] . '/' . $_GET['Day'] . '/' . $_GET['Year'];

	$_GET['date'] = $date;
}
add_action( 'init', 'idoent_set_date_for_form' );
?>