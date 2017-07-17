/* agenda.js */
(function(window,$){
  var AddAgenda = $.fn.AddAgenda = function(elem,data,speakers){
    // specify session template
    var template = $(elem).attr('data-template');
    if( typeof template == 'undefined' )
      template = 'default';

    switch( template ){
      case 'block':
        var sessionTemplate = Handlebars.compile( $('#agenda-block-session-template').html() );
      break;

      case 'feature':
        var sessionTemplate = Handlebars.compile( $('#agenda-speaker-feature-template').html() );
      break;

      default:
        var sessionTemplate = Handlebars.compile( $('#agenda-default-session-template').html() );
    }

    // get Agenda data
    var time = $(elem).attr('data-time');
    if( typeof time !== 'undefined' ){
      var timeArray = time.split(':');
      var day = timeArray[0];
      var time = timeArray[1];
      var session = data[day][time];
      session.themeurl = wpvars.themeurl;

      // Process sessionSpeakers array
      if( typeof session.sessionSpeakers !== 'undefined' ){
        session.sessionSpeakers.forEach(function(currentValue, index, array){
          currentValue.speaker = speakers[currentValue.speaker];
          if( typeof currentValue.speaker !== 'undefined' ){
            var converter = new showdown.Converter();
            if( typeof currentValue.speaker.abstract !== 'undefined' ){
              var abstract = currentValue.speaker.abstract,
                abstractHtml = converter.makeHtml(abstract);
                currentValue.speaker.abstractHtml = abstractHtml;
            }
            if( typeof currentValue.speaker.tagline !== 'undefined' ){
              var tagline = currentValue.speaker.tagline,
                taglineHtml = converter.makeHtml(tagline);
                currentValue.speaker.taglineHtml = taglineHtml;
            }
          }
        });
      }

      if( typeof session.speaker !== 'undefined' ){
        session.speaker = speakers[session.speaker];
        if( typeof session.speaker !== 'undefined' ){
          var converter = new showdown.Converter();
          if( typeof session.speaker.abstract !== 'undefined' ){
            var abstract = session.speaker.abstract,
              abstractHtml = converter.makeHtml(abstract);
              session.speaker.abstractHtml = abstractHtml;
          }
          if( typeof session.speaker.tagline !== 'undefined' ){
            var tagline = session.speaker.tagline,
              taglineHtml = converter.makeHtml(tagline);
              session.speaker.taglineHtml = taglineHtml;
          }
        }
      }

      // Add section to .agenda
      sessionHtml = sessionTemplate( session );
      $(elem).append( sessionHtml );
    }

    return this;
  }

  window.AddAgenda = AddAgenda;
})(window, jQuery);

jQuery(function($){
  // Setup speakers as a var we can access inside AddAgenda
  var speakers;

  function getSpeakers( callback ){
    $.getJSON(agendavars.speakerdata + '?ver=' + agendavars.dataversion, function(data){
      callback(data);
    });
  }

  getSpeakers( function(data){
    speakers = data;
    $.getJSON(agendavars.agendadata + '?ver=' + agendavars.dataversion, function( data ){
      $('.agenda').each(function(){
        AddAgenda($(this),data, speakers);
      });
    });
  });


});