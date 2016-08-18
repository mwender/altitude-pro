(function(window,$){
	var AddSpeakers = $.fn.AddSpeakers = function(elem,data){
		var speakerTemplate = Handlebars.compile( $('#speaker-template').html() );
		var emptyColTemplate = Handlebars.compile( $('#emptycol-template').html() );
		var speakers = {};

		classes = $(elem).attr('class');

		var thumbnailsOnly = false;
		if( $(elem).hasClass('thumbnails') )
			thumbnailsOnly = true;

		// Only show specified speakers
		var includeSpeakers = $(elem).attr('data-speakers');
		if( typeof includeSpeakers !== 'undefined' ){
			var speakersToInclude = includeSpeakers.split(',');
			$.each( speakersToInclude, function( key, val ){
				//val.thumbnailsOnly = thumbnailsOnly;
				data[val]['thumbnailsOnly'] = thumbnailsOnly;
				speakers[val] = data[val];
			});
		} else {
			var hideSession = false;
			var hideKeynote = false;

			// Restrict set to only keynote or session speakers?
			if( $(elem).hasClass('keynote') ){
				hideSession = true;
			} else if( $(elem).hasClass('session') ){
				hideKeynote = true;
			}

			$.each( data, function( key, val ){
				val.thumbnailsOnly = thumbnailsOnly;

				if( true == hideSession && 'session' != val.type ){
					speakers[key] = val;
				} else if( true == hideKeynote && 'keynote' != val.type ){
					speakers[key] = val;
				} else if( false == hideSession && false == hideKeynote ) {
					speakers[key] = val;
				}
			});
		}

		var thumbnailWidth = $(elem).attr('data-width');
		if( typeof thumbnailWidth !== 'undefined' && !isNaN( parseFloat(thumbnailWidth) ) && isFinite(thumbnailWidth) ){
			$.each( speakers, function( key, val ){
				speakers[key]['widthHeight'] = ' width=\'' + thumbnailWidth + '\' height=\'' + thumbnailWidth + '\'';
			});
		}
		console.log(speakers);

		var cols = $(elem).attr('data-columns'); // Number of columns for display
		var useColumns = false;
		var colClass = '';
		if( typeof cols !== 'undefined' && !isNaN(parseFloat(cols)) && isFinite(cols) ){
			useColumns = true;
			if( 2 == cols ){
				colClass = 'one-half';
			} else if ( 3 == cols ){
				colClass = 'one-third';
			} else if ( 4 == cols ){
				colClass = 'one-fourth';
			} else if ( 5 == cols ){
				colClass = 'one-fifth';
			} else if ( 6 <= cols ){
				colClass = 'one-sixth';
			}
		}

		var numOfSpeakers = Object.keys(speakers).length;
		var col = 1; // column counter
		var row = 0; // row counter
		var speakerCount = 1; // speaker counter
		var speakerHtml = '';
		var speakerRows = new Array();

		$.each(speakers,function(key,val){

			val.key = key;
			val.themeurl = wpvars.themeurl;
			val.colClass = colClass;

			var converter = new showdown.Converter(),
				tagline = val.tagline,
				taglineHtml = converter.makeHtml(tagline);

				val.taglineHtml = taglineHtml;

			if( true == useColumns ){
				if( col == 1 ){
					val.colClass += ' first';
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
					speakerRows[row] = '<div class="clearfix usecolumns">' + speakerHtml + '</div>';
					// reset col/increment row
					col = 1;
					row = row + 1;
				} else {
					// increment col
					col++;
				}
				speakerCount++;
			} else {
				// Don't use columns
				speakerHtml = speakerHtml + speakerTemplate( val );
				if( speakerCount == numOfSpeakers ){
					speakerRows[0] = '<div class="clearfix">' + speakerHtml + '</div>';
				}
				speakerCount++;
			} // if( true == useColumns )
		});

		// Add speakers to content
		$.each( speakerRows, function( key, row ){
			$(elem).append( row );
		});

		return this;
	}

	window.AddSpeakers = AddSpeakers;
})(window, jQuery);

jQuery(function($){
	var speakerOverlayTemplate = Handlebars.compile( $('#overlay-template').html() );

	// Speaker photos and bios
	$.getJSON(wpvars.dataurl + '?ver=' + wpvars.dataversion , function( data ){

		$('.speakers').each(function(){
			AddSpeakers($(this), data);
		});

		// Show overlay on click for speaker thumbnails
		$('.speakers').on('click', 'a.speaker', function(e){
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

	}); // $.getJSON
});