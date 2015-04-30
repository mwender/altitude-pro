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

	// Toggle the FAQ answers
	$( 'article.page .easy-faqs-wrapper .easy-faq .easy-faq-title' ).click(function() {
		var id = $(this).parent().attr('id');
		$( '#' + id + ' .easy-faq-body' ).slideToggle();
	});

	// Number the FAQs
	var easyfaqs = $( 'article.page .easy-faqs-wrapper .easy-faq' );
	if( 0 < easyfaqs.length ){
		for( x = 0; x < easyfaqs.length; x++ ){
			faq = easyfaqs[x];
			id = $(faq).attr( 'id' );
			$( '#' + id + ' .easy-faq-title' ).prepend( '<div class="num">' + ( x + 1 ) + '.</div><div class="ans">' ).append('</div>');
		}
	}

	// Apply SelectBoxIt to selects
	$("select").selectBoxIt({
	});

});