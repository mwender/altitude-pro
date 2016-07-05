<?php
namespace Genesis\AltitudePro\GoogleAnalytics;

add_action( 'wp_footer', __NAMESPACE__ . '\\add_google_analytics_tracking' );
function add_google_analytics_tracking(){
	if( ! is_user_logged_in() || ! current_user_can( 'activate_plugins' ) ){
?>

<!-- Google Analytics Tracking - UA-7666796-3 -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-7666796-3', 'auto');
  ga('send', 'pageview');

</script>
<?php
	} else {
?>

<!-- Google Analytics Tracking not displayed for Admin users. -->
<?php
	}
}
?>