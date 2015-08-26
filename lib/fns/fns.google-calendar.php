<?php
/**
 * Functions for interacting with a Google Calendar.
 *
 *
 *
 * @link URL
 * @since 1.x.x
 *
 * @package I Do Entertainment Theme
 * @subpackage Component
 */

 function gcal_freebusy(){

 	$date = $_POST['date'];

 	$response = new stdClass();

 	if( null == $date )
 		$response->message = 'No date specified.';

 	$api_key = trim( genesis_get_option('google_api_key') );
 	if( empty( $api_key ) )
 		$response->message = 'ERROR: No API Key set!';

 	$cal_id = trim( genesis_get_option('google_cal_id') );
 	if( empty( $cal_id ) )
 		$response->message = 'ERROR: No Calendar ID set!';

 	if( ! empty( $date ) && ! empty( $api_key ) && ! empty( $cal_id ) ){
 		$url = 'https://www.googleapis.com/calendar/v3/freeBusy?key=' . $api_key;

 		if( $timezone_string = get_option( 'timezone_string' ) ){
	 		$date = new DateTime( $date, new DateTimeZone( $timezone_string ) );
 		} else {
 			$date = new DateTime( $date );
 		}

 		$timeMin = $date->format( 'Y-m-d\TH:i:sP');
 		$date->modify( '+23 hours 59 minutes 59 seconds' );
 		$timeMax = $date->format( 'Y-m-d\TH:i:sP');

 		$args = array(
 			'headers' => array( 'content-type' => 'application/json' ),
			'timeout' => 30,
			'body' => '{
			  "timeMin": "' . $timeMin . '",
			  "timeMax": "' . $timeMax . '",
			  "timeZone": "' . $timezone_string . '",
			  "items": [
			    {
			      "id": "' . $cal_id . '"
			    }
			  ]
			}'
		);
		
		$response->args = $args;
		$result = wp_remote_post( $url, $args );
		if( is_wp_error( $result ) ){
			$response->message = $result->get_error_message();
		} else {
			$body = json_decode( wp_remote_retrieve_body( $result) );
			$busy = $body->calendars->$cal_id->busy;
			$response->body = $body;
			$response->busy = $busy;
			$response->available = ( 0 < count( $busy ) )? false : true;
			$response->status = wp_remote_retrieve_response_code( $result );
		}
 	}

 	wp_send_json( $response );

 }
