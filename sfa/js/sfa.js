window.onload = function() {

	var $btnsToggle = $('.js-btn-toggle');

	$btnsToggle.on('click touch', function(event) {
		$('.' + event.target.dataset.modifies).toggleClass('active');
	});


	initCarousel();

};

// our scrolly navigation
var scrollTo = function(elem, space) {
	console.log(space)
	$('html,body').animate({
    scrollTop: $(elem).offset().top - (60 + space)},
    'slow');
	if ($('.navigation-main').hasClass('active')) {
		$('.navigation-main').removeClass('active')
	}
};

// change any style property
var changeStyle = function(selectorText, style, value) {
  var theRules = new Array();
  if (document.styleSheets[0].cssRules) {
      theRules = document.styleSheets[0].cssRules;
  } 
  else if (document.styleSheets[0].rules) {
      theRules = document.styleSheets[0].rules;
  }
  for (n in theRules)
  {
    if (theRules[n].selectorText == selectorText) {
        theRules[n].style[style] = value;
    }
  }
}

debugger


var initCarousel = function() {

	// find all carousels
	var $carousels = $('.js-carousel-container');

	// split each carousel and deal with it separately as 'carousel'
	$.each($carousels, function(i,carousel) {

		// set up the carousel instance

		// get the width of the container for later use
		var width = $(carousel).innerWidth();
		// set the height of the container but we'll mess with it later
		var height = 0
		// counter for position of the carousel
		var current = 0;
		// find all the slides int he carousel
		var $slides = $(carousel).find('.js-carousel-section');


		// functions are cool
		var isActive = function(i) {
			if (i === current) {
				return('active');
			} else {
				return('');
			}
		};

		// iterate over each slide in carousel and assign it a number, initial state and correct width
		$.each($slides, function(ii,slide) {
			$(slide).addClass(isActive(ii) + ' slide-' + ii);
			$(slide).innerWidth(width);
			if ( $(slide).innerHeight() > height ) {
				height = $(slide).innerHeight();
			} else {
				$(slide).innerHeight(height);
			}
		});

		// $(slider).on('click touch', function(event) {
			
		// 	if ($(event.target).hasClass('btn-next')) {
		// 		if ((current + 1) < $slides.length) {
		// 			current ++;
		// 			$(slider).find('.btn-prev').removeClass('inactive');
		// 			if (current === ($slides.length -1)) {
		// 				$(slider).find('.btn-next').addClass('inactive');
		// 			}
		// 			$(slider).find('.slide.active').removeClass('active').addClass('slide-left');
		// 		} else {
		// 			current = 0;
		// 			$(slider).find('.btn-prev').addClass('inactive');
		// 			$(slider).find('.btn-next').removeClass('inactive');
		// 			$(slider).find('.slide').removeClass('active slide-left').addClass('slide-right');
		// 		}
		// 	} else if ($(event.target).hasClass('btn-prev')) {
		// 		if (current > 0) {
		// 			current --;
		// 			if (current === 0) {
		// 				$(slider).find('.btn-prev').addClass('inactive');
		// 			}
		// 			$(slider).find('.slide.active').removeClass('active').addClass('slide-right');
		// 		} else {
		// 			return;
		// 		}
		// 	};

		// 	$(slider).find('.slide-' + current).removeClass('slide-left slide-right').addClass('active');

		// });
	});
};