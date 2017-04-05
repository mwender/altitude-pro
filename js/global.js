jQuery(function( $ ){

	if( $('body').hasClass( 'home' ) ){
		if( $( document ).scrollTop() > 0 ){
			$( '.site-header' ).addClass( 'dark' );
		}
	} else {
		$( '.site-header' ).addClass( 'dark' );
	}

	// Add opacity class to site header
	if( $('body').hasClass( 'home' ) ){
		$( document ).on('scroll', function(){
			if ( $( document ).scrollTop() > 0 ){
				$( '.site-header' ).addClass( 'dark' );

			} else {
				$( '.site-header' ).removeClass( 'dark' );
			}

		});
	}

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

  // Photoswipe galleries
  $('.photoswipe').on('click',function(e){
    e.preventDefault();
    var gallery = $(this).attr('data-gallery');
    $.getJSON(globaljsvars.dataurl + '/' + gallery + '/images.json?ver=' + globaljsvars.dataversion, function( images ){
      var pswpElement = document.querySelectorAll('.pswp')[0];

      // define options (if needed)
      var options = {
          // optionName: 'option value'
          // for example:
          index: 0 // start at first slide
      };

      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, images, options);
      gallery.init();
    });
  });

  // Adds `Read More` link
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

  // Lightbox open
  $('body').on('click', '.lightbox', function(e){
  	e.preventDefault();
  	var image = $(this).attr( 'href' );
  	var lightbox = '<div class="lightbox-overlay" id="active-lightbox"><a href="#" class="close"></a><div class="clearfix"><img src="' + image + '" /></div></div>';

    $('body').prepend( lightbox ).addClass('noscroll');
  	$('.lightbox-overlay').fadeIn();
  });

  // Close Lightbox on click anywhere
  $('body').on('click','.lightbox-overlay', function(e){

    e.preventDefault();
    var target = e.target;

    if( $(target).has('.lightbox-overlay#active-lightbox') ){
      $('body').removeClass('noscroll');
      $( this ).fadeOut().remove();
    }
  });

  // Lightbox close
	$('body').on('click', 'a.close', function(e){
		e.preventDefault();
		var overlay = $(this).parents('div.lightbox-overlay');
		var lightboxId = overlay.attr('id');
		$('body').removeClass('noscroll');
		$('.lightbox-overlay#' +  lightboxId ).fadeOut().remove();
	});

}); // jQuery(function( $ ){