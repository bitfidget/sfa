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

	var $accordions = $('.js-a');

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





























// everything you see below you is sadly wasted codez :(


// change any style property
var updateStyle = function(selectorText, style, value) {
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
};

var carouselClick = function(carousel) {

	var currentS = $(carousel).find(('.slide-' + carousel.current));
	currentS.removeClass('left right').addClass('active');

	// if current = 0
	if (carousel.current === 0) {
		console.log('first slide');
		for (var i = 1; i < carousel.slides.length; i++) {
			$(carousel).find('.slide-' + i ).removeClass('left active').addClass('right');
		}
	} else if (carousel.current === (carousel.slides.length - 1)) {
		console.log('last slide');
		for (var i = 0; i < (carousel.slides.length - 1); i++) {
			$(carousel).find('.slide-' + i ).removeClass('right active').addClass('left');
		}
	} else {
		console.log('slide ' + carousel.current);
		for (var i = 0; i < carousel.current; i++) {
			$(carousel).find('.slide-' + i ).removeClass('right active').addClass('left');
		}
		for (var i = (carousel.current + 1); i < carousel.slides.length; i++) {
			$(carousel).find('.slide-' + i ).removeClass('left active').addClass('right');
		}
	}
};

var carouselDelay = function(carousel) {

	console.log('tick ' + carousel.current);
	if (carousel.current < carousel.slides.length - 1) {
		carousel.current++;
	} else {
		carousel.current = 0
	}
	carouselClick(carousel);
}

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

		// iterate over each slide in carousel and assign it a number, initial state and correct width
		$.each(carousel.slides, function(ii,slide) {
			$(slide).addClass('slide-' + ii);
			$(slide).innerWidth(carousel.width);
			if ( $(slide).innerHeight() > carousel.height ) {
				carousel.height = $(slide).innerHeight();
			}
		});

		// iterate again to add the same height to all elements
		$.each(carousel.slides, function(ii,slide) {
			$(slide).innerHeight(carousel.height);
			$(carousel).innerHeight(carousel.height);
		});

		carouselClick(carousel);
		setInterval(function() { carouselDelay(carousel) }, 2000);
		// $(slider).on('click touch', function(event) {
			
		// 	if ($(event.target).hasClass('btn-next')) {
		// 		if ((current + 1) < carousel.slides.length) {
		// 			current ++;
		// 			$(slider).find('.btn-prev').removeClass('inactive');
		// 			if (current === (carousel.slides.length -1)) {
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