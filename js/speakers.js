(function(window,$){
	var AddSpeakers = $.fn.AddSpeakers = function(elem,data){
		var listSpeakers = $(elem).attr('data-list-speakers');
		if( typeof listSpeakers !== 'undefined' ){
			var speakerTemplate = Handlebars.compile( $('#speaker-condensed-template').html() );
		} else {
			var speakerTemplate = Handlebars.compile( $('#speaker-template').html() );
		}

		var speakers = {};

		classes = $(elem).attr('class');

		var thumbnailsOnly = false;
		if( $(elem).hasClass('thumbnails') )
			thumbnailsOnly = true;

		var showAbstract = false;
		if( $(elem).hasClass('abstract') )
			showAbstract = true;


		var showRoom = false;
		if( $(elem).hasClass('room') )
			showRoom = true;

		// Only show specified speakers
		var includeSpeakers = $(elem).attr('data-speakers');
		if( typeof includeSpeakers !== 'undefined' ){
			var speakersToInclude = includeSpeakers.split(',');
			$.each( speakersToInclude, function( key, val ){
				if( typeof data[val] == 'undefined' ){
					console.log('Speaker `' + val + '` not found.');
				} else {
					data[val]['thumbnailsOnly'] = thumbnailsOnly;
					data[val]['showAbstract'] = showAbstract;
					if( true == showAbstract ){
						var converter = new showdown.Converter(),
					    abstract = data[val]['abstract'],
					    abstractHtml = converter.makeHtml(abstract);
					    data[val]['abstractHtml'] = abstractHtml;
					}
					data[val]['showRoom'] = showRoom;
					speakers[val] = data[val];
				}

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

			// Check for data-exclude-speakers=""
			var excludeSpeakers = $(elem).attr('data-exclude-speakers');
			if( typeof excludeSpeakers != 'undefined' ){
				var speakersToExclude = excludeSpeakers.split(',');
			}

			$.each( data, function( key, val ){
				val.thumbnailsOnly = thumbnailsOnly;
				val.showAbstract = showAbstract;

				if( true == showAbstract ){
					var converter = new showdown.Converter(),
				    abstract = val.abstract,
				    abstractHtml = converter.makeHtml(abstract);
				    val.abstractHtml = abstractHtml;
				}

				if( typeof speakersToExclude != 'undefined' && -1 != $.inArray( key, speakersToExclude ) ){
						return true;
				} else {
					if( true == hideSession && 'session' != val.type ){
						speakers[key] = val;
					} else if( true == hideKeynote && 'keynote' != val.type ){
						speakers[key] = val;
					} else if( false == hideSession && false == hideKeynote ) {
						speakers[key] = val;
					}
				}

			});
		}

		var thumbnailWidth = $(elem).attr('data-width');
		if( typeof thumbnailWidth !== 'undefined' && !isNaN( parseFloat(thumbnailWidth) ) && isFinite(thumbnailWidth) ){
			$.each( speakers, function( key, val ){
				speakers[key]['widthHeight'] = ' width=\'' + thumbnailWidth + '\' height=\'' + thumbnailWidth + '\'';
			});
		}

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

				// Set `col` == `cols` if we're on the last speaker
				if( speakerCount == numOfSpeakers && col != cols ){
					col = cols;
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

(function(window,$){
	var hideText = $.fn.hideText = function(textselector, strlen, moretext, lesstext){
    strlen = typeof strlen !== 'undefined' ? strlen : 100;
    moretext = typeof moretext !== 'undefined' ? moretext : 'Read More';
    lesstext = typeof lesstext !== 'undefined' ? lesstext : 'Read Less';

    var sections = $( textselector );
    for(var i = 0; i < sections.length; i++ ){
        var textToHide = $( sections[i] ).html();
        var textToCheck = $( sections[i] ).text().substring(strlen);
        if( '' == textToCheck )
            continue;
        var visibleText = $( sections[i] ).text().substring(0, strlen);

        $( sections[i] )
            .html(('<span class="visible-text" style="cursor: pointer;">' + visibleText + '</span>') + ('<span class="hidden-text">' + textToHide + '[<a id="read-less" style="cursor: pointer;">' + lesstext + '</a>]</span>'))
            .append('<span class="read-more">&hellip;[<a id="read-more" title="' + moretext + '" style="cursor: pointer;">' + moretext + '</a>]</spam>')
            .click(function() {
                $(this).find('span.hidden-text').toggle();
                $(this).find('span.read-more').toggle();
                $(this).find('span.visible-text').toggle();
            });
        $( sections[i] ).find( 'span.hidden-text' ).hide();
    }
  }
  window.hideText = hideText;
})(window, jQuery);

jQuery(function($){
	var speakerOverlayTemplate = Handlebars.compile( $('#overlay-template').html() );
	var abstractOverlayTemplate = Handlebars.compile( $('#abstract-template').html() );

	// Speaker photos and bios
	$.getJSON(wpvars.dataurl + '?ver=' + wpvars.dataversion , function( data ){

		$('.speakers').each(function(){
			AddSpeakers($(this), data);
		});
		hideText( 'div.hidetext', 200, 'More &darr;', 'Less &uarr;' );

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

		// Show abstract overlay on click for `View abstract` link
		$('.speakers').on('click', 'a.abstract', function(e){
			e.preventDefault();
			var speakerId = $(this).attr('data-speaker');
			var speaker = data[speakerId];
			speaker.themeurl = wpvars.themeurl;

			// Convert markdown
			var converter = new showdown.Converter(),
		    abstract = speaker.abstract,
		    abstractHtml = converter.makeHtml(abstract),
		    tagline = speaker.tagline,
		    taglineHtml = converter.makeHtml(tagline);
		    speaker.abstractHtml = abstractHtml;
		    speaker.taglineHtml = taglineHtml;

		    var overlay = abstractOverlayTemplate( speaker );
		    $('body').prepend( overlay ).addClass('noscroll');
		});

		$('body').on('click', 'a.close', function(e){
			e.preventDefault();
			var speakerId = $(this).attr('data-speaker');
			$('body').removeClass('noscroll');
			$('#' +  speakerId ).remove();
		});

		$('body').on('click', '.abstract-overlay', function(e){
			e.preventDefault();
			if( e.target !== this )
				return;

			$('body').removeClass('noscroll');
			$(this).remove();
		});

		$('body').on('click', '.speaker-overlay', function(e){
			e.preventDefault();
			if( e.target !== this )
				return;

			$('body').removeClass('noscroll');
			$(this).remove();
		});

	}); // $.getJSON
});