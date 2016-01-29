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

	// window.onresize = initCarousel();

	initAccordion();

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

	// 
	$.each($accordions, function(i,accordion) {

		// counter for position of the carousel
		accordion.current = 0;
		accordion.sections = $(accordion).find('.js-team-section');
		accordion.members = $(accordion).find('.js-team-member');

		$.each(accordion.sections, function(ii, section) {
			$(section).addClass('slide-' + ii);
			section.dataset.modifier = (ii);

		});

		$.each(accordion.members, function(ii, member) {
			$(member).addClass('slide-' + ii);
			member.dataset.modifies = (ii);

		});

		// var currentAccordion = dataset.modifies;

		accordion.members.on('click touch', function(i,v) {

			// $(window).resize(function(){
			// 	if ($(window).width() >= 800) {}
			// });

			$(accordion).find('.active').removeClass('active');
			// $(accordion).find('.js-team-section.slide-' + currentAccordion).hide();

			// $('.js-team-section.active').hide();


			var target = this.dataset.modifies;

			$('.js-team-section.active').hide();

			

			if ( $('.js-team-section.slide-' + target).is(':visible') ) {
				$(accordion).find('.active').removeClass('active');
				$('.js-team-section').hide();
				
			}

			else {
				$('.js-team-section').hide();
				$(accordion).find('.slide-' + target).addClass('active');
				$('.active').fadeIn();
			}

			



			// if class is already active
			// if ($(this).hasClass('.active')) {
			//  	$('.js-team-section').hide();
			//  }
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


/* Sending data to Google Docs spreadsheets through ajax request */

function postContactToGoogle() {
    var first = $('#firstName').val();
    var last = $('#lastName').val();

    // var interest = $('interests').val();

    // attempt at getting checkboxes to work
    var interest = $('input:checkbox:checked').serialize();


    var email = $('#email').val();

        $.ajax({
            url: "https://docs.google.com/a/pwc.com/forms/d/127C47i_BAUxGG7TMUW43CyN89dmmmjJl8kmLi73Khgs/formResponse",
            data: { "entry.578566935": first, 
            "entry.1652291931": last,
            "entry.732368356" : interest,
            "entry.891975652": email },
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function () {
                    // alert("Success");
                    console.log("success");

                    // will still get a CORS message for some reason
                },
                200: function () {
                    // console.log("error");
                }
            }
        });
}

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


// window.onresize = function() {
// 	//debugger
// 	console.log("test");
// 	initCarousel();
// }

// window.onresize = initCarousel;

$(window).resize(function() {
	console.log("hello");
	initCarousel();
});


// $(window).resize(function() {
// 	if (width <= 800) {
// 		$('.js-carousel-section .bg-dark-trans').appendTo('.js-carousel-control .control');
// 	}
// })

// if (mobile == true) {
// 	$('js-carousel-section').insertAfter($('js-carousel-control'));
// }








// everything you see below you is sadly wasted codez :(


// change any style property
// var updateStyle = function(selectorText, style, value) {
//   var theRules = new Array();
//   if (document.styleSheets[0].cssRules) {
//       theRules = document.styleSheets[0].cssRules;
//   } 
//   else if (document.styleSheets[0].rules) {
//       theRules = document.styleSheets[0].rules;
//   }
//   for (n in theRules)
//   {
//     if (theRules[n].selectorText == selectorText) {
//         theRules[n].style[style] = value;
//     }
//   }
// };

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
		$(carousel).hover(function() {
		  carousel.hover = true;
		}, function() {
		  carousel.hover = false;
		});

		carouselClick(carousel);
		// setInterval(function() { carouselDelay(carousel) }, 2000);

	});
};