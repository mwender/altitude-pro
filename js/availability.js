jQuery(function( $ ){

    $('.datepicker').datepicker({
        dateFormat : 'D, M d, yy',
        changeMonth: true,
        changeYear: true,
        altField: '.altDate',
        altFormat: 'yy-mm-dd',
        minDate: 2
    });

	$('.check-availability').click(function(e){
		e.preventDefault();

		var date = $('.altDate').val();
		if( '' == date ){
			alert( 'Please select a date.' );
			return false;
		}

		var button = $(this);
		button.prop('disabled',true);

		var data = {
			action: 'availability_checker',
			date: date
		};

		$.post( wpvars.ajax_url, data, function(response){
			console.log(response);
			if( true === response.available ){
				console.log('Available. Route user to a contact form with the date pre-filled.');
				window.location.href = wpvars.available_redirect_url + '?date=' + date;
			} else {
				console.log('NOT available!');
				alert('The date you selected is not available.');
				button.prop('disabled',false);
			}

		});
	});

});