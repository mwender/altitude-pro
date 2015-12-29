<?php

/**
 * Customizer additions.
 *
 * @package Altitude Pro
 * @author  StudioPress
 * @link    http://my.studiopress.com/themes/altitude/
 * @license GPL2-0+
 */

/**
 * Get default accent color for Customizer.
 *
 * Abstracted here since at least two functions use it.
 *
 * @since 1.0.0
 *
 * @return string Hex color code for accent color.
 */
function altitude_customizer_get_default_accent_color() {
	return '#22a1c4';
}

add_action( 'customize_register', 'altitude_customizer_register' );
/**
 * Register settings and controls with the Customizer.
 *
 * @since 1.0.0
 * 
 * @param WP_Customize_Manager $wp_customize Customizer object.
 */
function altitude_customizer_register() {

	/**
	 * Customize Background Image Control Class
	 *
	 * @package WordPress
	 * @subpackage Customize
	 * @since 3.4.0
	 */
	class Child_Altitude_Image_Control extends WP_Customize_Image_Control {

		/**
		 * Constructor.
		 *
		 * If $args['settings'] is not defined, use the $id as the setting ID.
		 *
		 * @since 3.4.0
		 * @uses WP_Customize_Upload_Control::__construct()
		 *
		 * @param WP_Customize_Manager $manager
		 * @param string $id
		 * @param array $args
		 */
		public function __construct( $manager, $id, $args ) {
			$this->statuses = array( '' => __( 'No Image', 'altitude' ) );

			parent::__construct( $manager, $id, $args );

			$this->add_tab( 'upload-new', __( 'Upload New', 'altitude' ), array( $this, 'tab_upload_new' ) );
			$this->add_tab( 'uploaded',   __( 'Uploaded', 'altitude' ),   array( $this, 'tab_uploaded' ) );

			if ( $this->setting->default )
				$this->add_tab( 'default',  __( 'Default', 'altitude' ),  array( $this, 'tab_default_background' ) );

			// Early priority to occur before $this->manager->prepare_controls();
			add_action( 'customize_controls_init', array( $this, 'prepare_control' ), 5 );
		}

		/**
		 * @since 3.4.0
		 * @uses WP_Customize_Image_Control::print_tab_image()
		 */
		public function tab_default_background() {
			$this->print_tab_image( $this->setting->default );
		}

	}

	global $wp_customize;

	$images = apply_filters( 'altitude_images', array( '1', '3', '5', '7' ) );

	$wp_customize->add_section( 'altitude-settings', array(
		'description' => __( 'Use the included default images or personalize your site by uploading your own images.<br /><br />The default images are <strong>1600 pixels wide and 1050 pixels tall</strong>.', 'altitude' ),
		'title'    => __( 'Front Page Background Images', 'altitude' ),
		'priority' => 35,
	) );

	foreach( $images as $image ){

		$wp_customize->add_setting( $image .'-altitude-image', array(
			'default'  => sprintf( '%s/images/bg-%s.jpg', get_stylesheet_directory_uri(), $image ),
			'type'     => 'option',
		) );

		$wp_customize->add_control( new Child_Altitude_Image_Control( $wp_customize, $image .'-altitude-image', array(
			'label'    => sprintf( __( 'Featured Section %s Image:', 'altitude' ), $image ),
			'section'  => 'altitude-settings',
			'settings' => $image .'-altitude-image',
			'priority' => $image+1,
		) ) );

	}

	$wp_customize->add_setting(
		'altitude_accent_color',
		array(
			'default' => altitude_customizer_get_default_accent_color(),
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'altitude_accent_color',
			array(
				'description' => __( 'Change the default accent color for links, buttons, and more.', 'altitude' ),
			    'label'       => __( 'Accent Color', 'altitude' ),
			    'section'     => 'colors',
			    'settings'    => 'altitude_accent_color',
			)
		)
	);

}
