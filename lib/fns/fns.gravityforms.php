<?php

namespace AltitudePro\fns\gravityforms;

//add_filter( 'gform_notification_3', __NAMESPACE__ . '\\change_user_notification_attachments', 10, 3 );
function change_user_notification_attachments( $notification, $form, $entry ) {

    if ( 'Trial Member Notification' == $notification['name'] ) {
        $url = get_stylesheet_directory() . '/lib/pdfs/Prospect-Waiver.pdf';
        $notification['attachments'] = array( $url );
    }

    return $notification;
}