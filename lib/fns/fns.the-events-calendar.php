<?php

namespace AltitudePro\TheEventsCalendar;

add_filter( 'tribe_events_title', __NAMESPACE__ . '\\filter_tribe_events_title', 10, 1 );
function filter_tribe_events_title( $title ){
  if( stristr( $title, 'Events' ) ){
    $title = str_replace( 'Events', 'Classes', $title );
  }
  return $title;
}