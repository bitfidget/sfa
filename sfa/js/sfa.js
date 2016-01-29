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

		// iterate again to add the same height to all elements
		$.each(carousel.slides, function(ii,slide) {
			$(slide).innerHeight(carousel.height);
			$(carousel).innerHeight(carousel.height);
		});

		// monitor the hovering of the carousel - stop the animation if hovered
		$(carousel).hover(function() {
		  carousel.hover = true;
		}, function() {
		  carousel.hover = false;
		});

		carouselClick(carousel);
		setInterval(function() { carouselDelay(carousel) }, 2000);

	});
};