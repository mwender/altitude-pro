<?php
namespace AltitudePro\TrackingScripts;

/**
 * Adds Facebook Pixel tracking code
 *
 * Requires `FBPIXEL_ID` to be set inside wp-config.php.
 *
 * @return void
 */
add_action( 'wp_head', __NAMESPACE__ . '\\add_facebook_pixel_tracking' );
function add_facebook_pixel_tracking(){
  if( ! defined( 'FBPIXEL_ID') )
    return;

  $fbpixel_id = FBPIXEL_ID;

  if( ! is_user_logged_in() || ! current_user_can( 'activate_plugins' ) ){
    ?>
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '<?= $fbpixel_id ?>'); // Insert your pixel ID here.
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=<?= $fbpixel_id ?>&ev=PageView&noscript=1"
/></noscript>
<!-- DO NOT MODIFY -->
<!-- End Facebook Pixel Code -->
    <?php
  } else {
?>
<!-- Facebook Pixel code not displayed for logged in WordPress Admins. -->
<?php
  }
}

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
