jQuery(function( $ ){

	$('.check-availability').click(function(e){
		e.preventDefault();

		var button = $(this);
		button.prop('disabled',true);

		var parent = $(this).closest('.select-box-list');

		var month = parent.find('select.month').val();
		var day = parent.find('select.day').val();
		var year = parent.find('select.year').val();

		if( '' == month || '' == day || '' == year ){
			alert( 'Please select a MONTH, DAY, and YEAR.' );
			return false;
		}

		var date = year + '-' + month + '-' + day;
		console.log('date = ' + date);

		var data = {
			action: 'availability_checker',
			date: date
		};

		$.post( wpvars.ajax_url, data, function(response){
			console.log(response);
			if( true === response.available ){
				console.log('Available. Route user to a contact form with the date pre-filled.');
			} else {
				console.log('NOT available!');
				button.prop('disabled',false);
			}

		});
			}
	});

});