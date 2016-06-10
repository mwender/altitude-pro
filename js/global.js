jQuery(function( $ ){

	if( $( document ).scrollTop() > 0 ){
		$( '.site-header' ).addClass( 'dark' );
	}

	// Add opacity class to site header
	$( document ).on('scroll', function(){

		if ( $( document ).scrollTop() > 0 ){
			$( '.site-header' ).addClass( 'dark' );

		} else {
			$( '.site-header' ).removeClass( 'dark' );
		}

	});


	$( '.nav-primary .genesis-nav-menu, .nav-secondary .genesis-nav-menu' ).addClass( 'responsive-menu' ).before('<div class="responsive-menu-icon"></div>');

	$( '.responsive-menu-icon' ).click(function(){
		$(this).next( '.nav-primary .genesis-nav-menu,  .nav-secondary .genesis-nav-menu' ).slideToggle();
	});

	$( window ).resize(function(){
		if ( window.innerWidth > 800 ) {
			$( '.nav-primary .genesis-nav-menu,  .nav-secondary .genesis-nav-menu, nav .sub-menu' ).removeAttr( 'style' );
			$( '.responsive-menu > .menu-item' ).removeClass( 'menu-open' );
		}
	});

	$( '.responsive-menu > .menu-item' ).click(function(event){
		if ( event.target !== this )
		return;
			$(this).find( '.sub-menu:first' ).slideToggle(function() {
			$(this).parent().toggleClass( 'menu-open' );
		});
	});

    function hideText( textselector, strlen, moretext ){
        strlen = typeof strlen !== 'undefined' ? strlen : 100;
        moretext = typeof moretext !== 'undefined' ? moretext : 'Read More';

        var sections = $( textselector );
        for(var i = 0; i < sections.length; i++ ){
            console.log( sections[i] );
            var textToHide = $( sections[i] ).html();
            var textToCheck = $( sections[i] ).text().substring(strlen);
            if( '' == textToCheck )
                continue;
            var visibleText = $( sections[i] ).text().substring(0, strlen);

            $( sections[i] )
                .html(('<span class="visible-text">' + visibleText + '</span>') + ('<span class="hidden-text">' + textToHide + '</span>'))
                .append('<span class="read-more">&hellip;[<a id="read-more" title="' + moretext + '" style="cursor: pointer;">' + moretext + '</a>]</spam>')
                .click(function() {
                    $(this).find('span.hidden-text').toggle();
                    $(this).find('span.read-more').hide();
                    $(this).find('span.visible-text').hide();
                });
            $( sections[i] ).find( 'span.hidden-text' ).hide();
        }
    }

    hideText( '.hidetext', 200 );
});