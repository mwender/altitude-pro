/* agenda.js */
(function(window,$){
  var AddAgenda = $.fn.AddAgenda = function(elem,data){
    // specify session template
    var template = $(elem).attr('data-template');
    if( typeof template == 'undefined' )
      template = 'default';

    switch( template ){
      case 'block':
        var sessionTemplate = Handlebars.compile( $('#agenda-block-session-template').html() );
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

      // Add section to .agenda
      sessionHtml = sessionTemplate( session );
      $(elem).append( sessionHtml );
    }

    return this;
  }

  window.AddAgenda = AddAgenda;
})(window, jQuery);

jQuery(function($){
  $.getJSON(agendavars.agendadata + '?ver=' + agendavars.dataversion, function( data ){
    $('.agenda').each(function(){
      AddAgenda($(this),data);
    });
  });
});