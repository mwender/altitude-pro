<?php
/**
 * Altitude Pro.
 *
 * Template Name: Like Front Page
 *
 * @author  Brad Dalton
 * @link    https://wp.me/p1lTu0-gMl
 */

add_action( 'genesis_meta', 'altitude_front_page_genesis_meta' );
/**
 * Add widget support for homepage. If no widgets active, display the default loop.
 *
 * @since 1.0.0
 */
function altitude_front_page_genesis_meta() {

		// Enqueue scripts.
		add_action( 'wp_enqueue_scripts', 'altitude_enqueue_altitude_script' );

		// Add front-page body class.
		add_filter( 'body_class', 'altitude_body_class' );

		// Force full width content layout.
		add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

		// Remove breadcrumbs.
		remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

		// Remove the default Genesis loop.
		remove_action( 'genesis_loop', 'genesis_do_loop' );

		// Add homepage widgets.
		add_action( 'genesis_loop', 'altitude_front_page_widgets' );

		// Add featured-section body class.
		if ( is_active_sidebar( 'front-page-1' ) ) {

		// Add image-section-start body class.
		add_filter( 'body_class', 'altitude_featured_body_class' );

	}

}

// Define front page scripts.
function altitude_enqueue_altitude_script() {
	wp_enqueue_script( 'altitude-script', get_stylesheet_directory_uri() . '/js/home.js', array( 'jquery' ), CHILD_THEME_VERSION, true );
}

// Define front-page body class.
function altitude_body_class( $classes ) {

	$classes[] = 'front-page';

	return $classes;

}

// Define featured-section body class.
function altitude_featured_body_class( $classes ) {

	$classes[] = 'featured-section';

	return $classes;

}

// Add markup for front page widgets.
function altitude_front_page_widgets() {

	echo '<h2 class="screen-reader-text">' . __( 'Main Content', 'altitude-pro' ) . '</h2>';

    $fields = ['cf1','cf2','cf3','cf4','cf5','cf6','cf7'];

    $hero_unit_height = get_post_meta( get_the_ID(), 'hero_unit_height', true );

    foreach ( $fields as $key => $field ) {
        $section_class = '';
        $total_widgets = get_post_meta( get_the_ID(), $field, true );
        $section = $key + 1;
        if( 0 < $total_widgets ){
            if( 1 === $section ){
                if( 0 < $hero_unit_height )
                    $section_class = 'fh-image';
            }

            $section_class_types = [ 1 => 'image', 2 => 'solid', 3 => 'image', 4 => 'solid', 5 => 'image', 6 => 'solid', 7 => 'image' ];
            if( empty( $section_class ) )
                $section_class = $section_class_types[$section];
            error_log( '$section = ' . $section . '; $section_class = ' . $section_class );
            ?>
            <div class="front-page-<?= $section ?>" id="section-<?= $section ?>">
                <div class="<?= $section_class  ?>-section" <?php if ( 0 < $hero_unit_height ){ echo 'style="height: ' . $hero_unit_height . 'px"'; } ?>>
                    <div class="flexible-widgets widget-area <?= altitude_widget_area_class( $field, $total_widgets ) ?>">
                        <div class="wrap">
                        <?php
                        for( $x = 0; $x < $total_widgets; $x++ ){
                            $content = get_post_meta( get_the_ID(), $field . '_' . $x . '_widget', true );
                            ?>
                            <section class="widget widget_text">
                                <div class="widget-wrap">
                                    <div class="textwidget">
                                        <?= apply_filters( 'the_content', $content ); ?>
                                    </div>
                                </div>
                            </section>
                            <?php
                        }
                        ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
        }
    }
}

// Run the Genesis loop.
genesis();
