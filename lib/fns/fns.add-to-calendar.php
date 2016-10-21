<?php
namespace Genesis\AltitudePro\addToCalendar;

add_action( 'genesis_site_title', __NAMESPACE__ . '\\add_to_calendar', 11 );
function add_to_calendar(){
?>
    <script type="text/javascript">(function () {
            if (window.addtocalendar)if(typeof window.addtocalendar.start == "function")return;
            if (window.ifaddtocalendar == undefined) { window.ifaddtocalendar = 1;
                var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
                s.type = 'text/javascript';s.charset = 'UTF-8';s.async = true;
                s.src = ('https:' == window.location.protocol ? 'https' : 'http')+'://addtocalendar.com/atc/1.5/atc.min.js';
                var h = d[g]('body')[0];h.appendChild(s); }})();
    </script>
    <span class="addtocalendar atc-style-blue">
        <var class="atc_event">
            <var class="atc_date_start">2017-10-17 08:00:00</var>
            <var class="atc_date_end">2017-10-18 16:30:00</var>
            <var class="atc_timezone">America/New_York</var>
            <var class="atc_title">EDGE2017</var>
            <var class="atc_description">EDGE2017 Security Conference - https://www.edgesecurityconference.com</var>
            <var class="atc_location">Knoxville Convention Center, 701 Henley Street, Knoxville, TN 37902</var>
            <var class="atc_organizer">Sword &amp; Shield</var>
            <var class="atc_organizer_email">EDGE2017@edgesecurityconference.com</var>
        </var>
    </span>
<?php
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts' );
function enqueue_scripts(){
	wp_enqueue_script( 'atc', get_stylesheet_directory_uri() . '/js/addtocalendar.min.js', null, '1.5' );
}
?>