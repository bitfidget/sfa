$('input').keyup(function() {
    if ($('#firstName').val() != "" && $('#email').val() != "" && $('#position').val()) {
        $('#submit').removeClass('disableClick');
    } else {
        $('#submit').addClass('disableClick');
    }
})



/* Sending data to Google Docs spreadsheets through ajax request */

function postContactToGoogle() {

	var first = $('#firstName').val();
	var last = $('#lastName').val();
	var email = $('#email').val();
	var position = $('#position').val();

	var interests = $('.interests:checked').map(function() {
		return this.value;
	}).get().join(", ");

  // FIRST check to see if fields have a valid value. IF valid:

  // Check to see if email is valid -> regex; also check if no checkboxes have been selected
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {

  	$('.errorInterest').hide();
  	$('.errorPosition').hide();
  	document.getElementById('email').style.borderColor='red';
  	$('.errorText').show();
  	return false;
  }

  else if (interests == null || interests == "") {
  	$('.errorText').hide();
  	$('.errorPosition').hide();
    document.getElementById('email').style.borderColor='';
  	$('.errorInterest').show();

  	return false;
  }

  else if (position == null || position == "") {
  	$('.errorText').hide();
  	$('.errorInterest').hide();
  	document.getElementById('position').style.borderColor='red';
  	$('.errorPosition').show()

  	return false;
  }

  else {
  	$.ajax({
  		url: "https://docs.google.com/a/pwc.com/forms/d/127C47i_BAUxGG7TMUW43CyN89dmmmjJl8kmLi73Khgs/formResponse",
  		data: { "entry.578566935": first, 
  		"entry.1652291931": last,
  		"entry_732368356": interests,
  		"entry.891975652": email,
  		"entry.813013344": position },
  		type: "POST",
  		dataType: "xml",
  		traditional: true,
  		statusCode: {
  			0: function () {

  	      $('form').find('input').val('');
  	      $('input:checkbox').removeAttr('checked');
  	      $('#submit').addClass('disableClick');
  	      $('.errorText').hide();
  	      $('.errorInterest').hide();
  	      document.getElementById('email').style.borderColor='';

          $('.success').slideDown();

	  	  	},
	  	  200: function () {
	  	  }
	  	}
  	});
  }
};
