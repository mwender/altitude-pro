<?php

namespace AltitudePro\lib\fns\genesis;

function filter_get_image_args( $args = [] ){
    $args['fallback'] = 'none';
    return $args;
};
add_filter( 'genesis_get_image_default_args', __NAMESPACE__ . '\\filter_get_image_args' );