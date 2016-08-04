var speakerHtml = '';

jQuery(function($){
	var speakerTemplate = Handlebars.compile( $('#speaker-template').html() );
	var emptyColTemplate = Handlebars.compile( $('#emptycol-template').html() );
	var speakerOverlayTemplate = Handlebars.compile( $('#overlay-template').html() );

	// Speaker photos and bios
	$.getJSON(wpvars.dataurl + '?ver=' + wpvars.dataversion , function( data ){
		var numOfSpeakers = Object.keys(data).length;
		var col = 1; // column counter
		var cols = 3; // total num of cols
		var row = 0; // row counter
		var speakerRows = new Array();
		var speakerCount = 1;

		if( 'false' == wpvars.showkeynotes ){
			$.each( data, function( key, val ){
				if( 'keynote' == val.type ){
					delete data[key];
				}
			});
		}

		// Add html to each row
		$.each( data, function( key, val ){
			val.key = key;
			val.themeurl = wpvars.themeurl;
			if( col == 1 ){
				speakerHtml = speakerTemplate( val );
			} else {
				speakerHtml = speakerHtml + speakerTemplate( val );
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
				speakerRows[row] = '<div class="clearfix" style="margin-bottom: 30px;">' + speakerHtml + '</div>';
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
			$('main.content .entry-content .speakers').append( row );
		});

		$('main.content .entry-content .speakers .one-third:first-of-type').addClass('first');

		// Show overlay on click for speaker thumbnails
		$('main.content .entry-content .speakers').on('click', 'a.speaker', function(e){
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