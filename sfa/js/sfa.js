window.onload = function() {

	var $btnsToggle = $('.js-btn-toggle');

	$btnsToggle.on('click touch', function(event) {
		$('.' + event.target.dataset.modifies).toggleClass('active');
	});

	var $squares = $('.js-square');

	$.each($squares, function(i,v) {
		$(v).outerHeight($(v).outerWidth());
	});
	
	initCarousel();
	initAccordion();

	$(window).bind('resize', function() {
		initCarousel();
		initAccordion();
	});
};

// our scrolly navigation
var scrollTo = function(elem, space) {
	console.log(elem)
	$('html,body').animate({
		scrollTop: $(elem).offset().top - (60 + space)},
		'slow');
	if ($('.navigation-main').hasClass('active')) {
		$('.navigation-main').removeClass('active')
	}
};


// accordion content
var initAccordion = function() {

	var $accordions = $('.js-a-group');

	$.each($accordions, function(i,accordion) {

		// counter for position of the carousel
		accordion.current = 0;
		accordion.sections = $(accordion).find('.js-team-section-mob');
		accordion.members = $(accordion).find('.js-team-member');

		$.each(accordion.sections, function(ii, section) {
			$(section).addClass('slide-' + ii);
			section.dataset.modifier = (ii);

		});

		$.each(accordion.members, function(ii, member) {
			$(member).addClass('slide-' + ii);
			member.dataset.modifies = (ii);

		});

		if ($(window).width() >= 800) {
			$('.js-team-section-mob').appendTo('.team-details-div');

			// Bounces the height for some reason
			$('.js-team-section-mob').hide();
		}

		accordion.members.on('click touch', function(i,v) {


			$(accordion).find('.active').removeClass('active');

			var target = this.dataset.modifies;

			$('.js-team-section-mob.active').slideUp();

			if ( $('.js-team-section-mob.slide-' + target).is(':visible') ) {
				$(accordion).find('.active').removeClass('active');
				$('.js-team-section-mob').slideUp();
			}

			else {
				$('.js-team-section-mob').slideUp();



				if ($(window).width() <= 800) {
					$('html,body').animate({
						scrollTop: $('.js-team-member.slide-' + target).offset().top
					}, 500);
				}

				$(accordion).find('.slide-' + target).addClass('active');

				$('.active').slideDown();
			}
		});
	});


$accordions.on('click touch', function(i,v) {
	
	var target = ('mod-' + this.dataset.modifies);
	var elem = $('.' + target);
	if (elem.hasClass('open')) {
		elem.removeClass('open').fadeOut();
	} else {
		$('.open').removeClass('open').fadeOut();
		elem.fadeIn().addClass('open');
	}
});
};


// var disableSubmit = function() {
// 	$('form > input').keyup(function() {
// 		var empty = false;

// 		$('form > input').each(function() {
// 			if ($(this).val() == '') {
// 				empty = true;
// 			}
// 		});

// 		if (empty) {
// 			$('.button').attr('disabled', 'disabled');
// 		}
// 		else {
// 			$('.button').removeAttr('disabled');
// 		}
// 	})
// }

$('input').keyup(function() {
	if ($('#firstName').val() != "" && $('#email').val() != "") {
		// $('#submit').removeAttr('disabled');
		$('#submit').removeClass('disableClick');
	}
	else {
		// $('#submit').attr('disabled', true);
		$('#submit').addClass('disableClick');
	}
})

/* Sending data to Google Docs spreadsheets through ajax request */

function postContactToGoogle() {

	var first = $('#firstName').val();
	var last = $('#lastName').val();
	var email = $('#email').val();

	var interests = $('.interests:checked').map(function() {
		return this.value;
	}).get().join(", ");

  // FIRST check to see if fields have a valid value. IF valid:

  // Check to see if email is valid -> regex; also check if no checkboxes have been selected
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
  	alert("Please put in a valid email address");
  	return false;
  }

  else if (interests == null || interests == "") {
  	alert("Please tick at least one area of interest.")
  	return false;
  }

  else {
  	$.ajax({
  		url: "https://docs.google.com/a/pwc.com/forms/d/127C47i_BAUxGG7TMUW43CyN89dmmmjJl8kmLi73Khgs/formResponse",
  		data: { "entry.578566935": first, 
  		"entry.1652291931": last,
  		"entry_732368356": interests,
  		"entry.891975652": email },
  		type: "POST",
  		dataType: "xml",
  		traditional: true,
  		statusCode: {
  			0: function () {
  				
  	      // CAN we make this a neater, in page message
  	      alert("Your form has been submitted.");

  	      // will still get a CORS message for some reason

  	      $('form').find('input').val('');
  	      $('input:checkbox').removeAttr('checked');
  	      $('#submit').addClass('disableClick');

  	  },
  	  200: function () {
  	      // console.log("error");
  	  }
  	}
  });
  }

  

  // IF NOT VALID

  // show message with form validation errors
  
};

$('#down-arrow').click(function() {
	$('html,body').animate({
		scrollTop: $('#industries').offset().top
	}, 800);
});

$('#subscribe-button').click(function() {
	$('html,body').animate({
		scrollTop: $('#subscribe').offset().top
	}, 800);
});

var carouselClick = function(carousel) {
	$.each(carousel.slides, function(ii,slide) {
		if (slide.dataset.modifier > carousel.current) {
			$(slide).removeClass('left active').addClass('right');
		} else if (slide.dataset.modifier < carousel.current) {
			$(slide).removeClass('active right').addClass('left');
		} else {
			$(slide).removeClass('left right').addClass('active');
		}
	});

	$.each(carousel.controls, function(ii,control) {
		if (control.dataset.modifies != carousel.current) {
			$(control).removeClass('active');
		} else {
			$(control).addClass('active');

			if ($(window).width() >= 800) {
				// do nothing
			}
			else {
				$('html,body').animate({
					scrollTop: $('.control.slide-' + ii).offset().top
				}, 500);
			}
		}
	});
};

var carouselDelay = function(carousel) {

	if (carousel.hover === false) {

		console.log('tick ' + carousel.current);
		if (carousel.current < carousel.slides.length - 1) {
			carousel.current++;
		} else {
			carousel.current = 0
		}
		carouselClick(carousel);
	}
};

var initCarousel = function() {

	// find all carousels
	var $carousels = $('.js-carousel-container');

	// split each carousel and deal with it separately as 'carousel'
	$.each($carousels, function(i,carousel) {

		// set up the carousel instance

		// get the width of the container for later use
		carousel.width = $(carousel).innerWidth();
		// set the height of the container but we'll mess with it later
		carousel.height = 0
		// counter for position of the carousel
		carousel.current = 0;
		// find all the slides int he carousel
		carousel.slides = $(carousel).find('.js-carousel-section');
		// find all the controls 
		carousel.controls = $(carousel).find('.js-carousel-control .control');
		// monitor the hover state on the carousel
		carousel.hover = false;

		// iterate over each slide in carousel and assign it a number, initial state and correct width
		$.each(carousel.slides, function(ii,slide) {
			$(slide).addClass('slide-' + ii);
			slide.dataset.modifier = (ii);
			$(slide).innerWidth(carousel.width);
			// console.log(carousel.height)
			// console.log(slide)

			if ( $(slide).innerHeight() > carousel.height ) {
				carousel.height = $(slide).innerHeight();

			}
		});

		// iterate over the controels and assign them a class also
		$.each(carousel.controls, function(ii,control) {
			$(control).addClass('slide-' + ii);
			control.dataset.modifies = (ii);	
		});

		$(carousel.controls).on('click hover', function(event) {
			carousel.current = this.dataset.modifies;
			carouselClick(carousel);
		});

		// Commented out height because messing with images

		// iterate again to add the same height to all elements
		
		if ($(window).width() >= 800) {
			$.each(carousel.slides, function(ii,slide) {
				$(slide).innerHeight(carousel.height);
				$(carousel).innerHeight(carousel.height);
			});
		}
		
		// monitor the hovering of the carousel - stop the animation if hovered
		// $(carousel).hover(function() {
		//   carousel.hover = true;
		// }, function() {
		//   carousel.hover = false;
		// });

if ($(window).width() >= 800) {
	carouselClick(carousel);
}

});
};