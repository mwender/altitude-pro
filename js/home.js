var speakerHtml = '';

jQuery(function( $ ){
	var speakerTemplate = Handlebars.compile( $('#speaker-template').html() );
	var emptyColTemplate = Handlebars.compile( $('#emptycol-template').html() );
	var speakerOverlayTemplate = Handlebars.compile( $('#overlay-template').html() );

	if (document.location.hash) {
			window.setTimeout(function () {
				document.location.href += '';
			}, 10);
	}

	// Local Scroll Speed
	$.localScroll({
		duration: 750
	});

	// Image Section Height
	var windowHeight = $( window ).height();
	$( '.image-section' ) .css({'height': windowHeight +'px'});

	$( window ).resize(function(){

		var windowHeight = $( window ).height();

		$( '.image-section' ) .css({'height': windowHeight +'px'});

	});

	// Speaker photos
	$.getJSON(wpvars.dataurl + '?ver=' + wpvars.dataversion , function( data ){
		var numOfSpeakers = Object.keys(data).length;
		var col = 1; // column counter
		var cols = 9; // total num of cols
		var row = 0; // row counter
		var speakerRows = new Array();
		var speakerCount = 1;

		$.each( data, function(key,val){
			//if( 6 < speakerCount )
			//	return false;

			val.key = key;
			val.themeurl = wpvars.themeurl;
			speaker = speakerTemplate( val );

			if( col == 1 ){
				speakerHtml = speaker;
			} else {
				speakerHtml = speakerHtml + speaker;
			}

			// Pad the row if col != cols and we're on the last speaker
			if( speakerCount == numOfSpeakers && col != cols ){
				var pad = cols - col;
				for (var i = 0; i < pad; i++) {
					speakerHtml = speakerHtml + emptyColTemplate( '' );
					col++;
				}
			}

			if( col == cols ){
				speakerRows[row] = '<div class="clearfix">' + speakerHtml + '</div>';
				// reset col/increment row
				col = 1;
				row = row + 1;
			} else {
				// increment col
				col++;
			}
			speakerCount++;
		});

		// Add speakers to content
		$.each( speakerRows, function( key, row ){
			$('div.speakers').prepend( row );
		});
		$('div.speakers div.speaker:last-of-type').addClass('last');

		// Get width of all .speaker
		var allSpeakersWidth = 0;
		$('div.speaker', '.speakers').each(function(){
			allSpeakersWidth += $(this).width();
		});
		var speakerDivWidth = $('.speakers').width();

		// Add text about speakers
		$('div.speakers > div.clearfix:first-child').append('<div class="speakers-text"><strong class="gold">Meet Our Speakers:</strong> Theresa Payton and Kevin Poulsen headline a celebrated lineup of experts in Healthcare, Retail, Legal, Banking and Finance, Manufacturing, and Government</div>');

		// Set width of .speakers-text
		var speakerTextWidth = (speakerDivWidth - allSpeakersWidth ) - 20;
		$('div.speakers-text').css({ 'width': speakerTextWidth + 'px', 'float': 'left', 'font-size': '14px', 'margin-left': '20px' });

		// Show overlay on click for speaker thumbnails
		$('body').on('click', 'a.speaker', function(e){
			e.preventDefault();
			var speakerId = $(this).attr('data-speaker');
			var speaker = data[speakerId];
			speaker.themeurl = wpvars.themeurl;

			// Convert markdown
			var converter = new showdown.Converter(),
		    bio = speaker.bio,
		    bioHtml = converter.makeHtml(bio),
		    tagline = speaker.tagline,
		    taglineHtml = converter.makeHtml(tagline);
		    speaker.bioHtml = bioHtml;
		    speaker.taglineHtml = taglineHtml;

			var overlay = speakerOverlayTemplate( speaker );
			$('body').prepend( overlay ).addClass('noscroll');
		});

		$('body').on('click', 'a.close', function(e){
			e.preventDefault();
			var overlay = $(this).parents('div.speaker-overlay');
			var speakerId = overlay.attr('id');
			$('body').removeClass('noscroll');
			$('.speaker-overlay#' +  speakerId ).remove();
		});
	});

});