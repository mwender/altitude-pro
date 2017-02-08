<?php
namespace AltitudePro\GoogleAnalytics;

/**
 * Adds Google Analytics to `wp_footer`
 *
 * Requires the `GAID` constant to be set inside wp-config.php.
 *
 * @since 1.x.x
 *
 * @return void
 */
add_action( 'wp_footer', __NAMESPACE__ . '\\add_google_analytics_tracking' );
function add_google_analytics_tracking(){
  if( ! defined( 'GAID') )
    return;

  $gaid = GAID;

  if( ! is_user_logged_in() || ! current_user_can( 'activate_plugins' ) ){
?>

<!-- Google Analytics Tracking - <?= $gaid ?> -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', '<?= $gaid ?>', 'auto');
  ga('send', 'pageview');

</script>
<?php
	} else {
?>
<!-- Google Analytics Tracking not displayed for Admin users. -->
<?php
	}
}