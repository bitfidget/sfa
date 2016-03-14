window.onload = function() {

	// var scrollorama = $.scrollorama({
 //        blocks:'.scrollblock'
 //    });

var $btnsToggle = $('.js-btn-toggle'),
	resizeTimer;

    $btnsToggle.on('click touch', function(event) {
        $('.' + event.target.dataset.modifies).toggleClass('active');
    });

    var $squares = $('.js-square');

    $.each($squares, function(i, v) {
        $(v).outerHeight($(v).outerWidth());
    });

    initCarousel();
    initAccordion();

    $(window).bind('resize', function() {
        
		clearTimeout(resizeTimer);
	  	resizeTimer = setTimeout(function() {
	        initCarousel();
	        reintinalizeAccordion();        
	  	}, 250);
        
    });
};

// our scrolly navigation
var scrollTo = function(elem, space) {
    $('html,body').animate({
            scrollTop: $(elem).offset().top - (60 + space)
        },
        'slow');
    if ($('.navigation-main').hasClass('active')) {
        $('.navigation-main').removeClass('active')
    }
};

// SCROLLORAMA


// accordion content
var initAccordion = function() {

    var $accordions = $('.js-a-group');

    $.each($accordions, function(i, accordion) {

        // counter for position of the carousel
        accordion.current = 0;
        accordion.sections = $(accordion).find('.js-team-section-mob');
        accordion.members = $(accordion).find('.js-team-member');

        $.each(accordion.sections, function(ii, section) {
            $(section).addClass('slide-' + ii).data('slide',ii);
            section.dataset.modifier = (ii);

        });

        $.each(accordion.members, function(ii, member) {
            $(member).addClass('slide-' + ii).data('slide',ii);
            member.dataset.modifies = (ii);

        });

        reintinalizeAccordion();

        accordion.members.on('click touch', function(i, v) {

            $(accordion).find('.active').removeClass('active');

            var target = this.dataset.modifies;

            if ($('.js-team-section-mob.slide-' + target).is(':visible')) {
                $(accordion).find('.active').removeClass('active');
                $('.js-team-section-mob').slideUp();
            } else {
                $('.js-team-section-mob').slideUp();
                $(accordion).find('.slide-' + target).addClass('active');
                $('.active').slideDown();
              }

        });
    });

};


var reintinalizeAccordion = function() {
	var $accordions = $('.js-a-group');

	if ($(window).width() >= 800) {
        $('.js-team-section-mob').appendTo('.team-details-div');
        $('.js-team-section-mob').hide();
    }
    else {
        $accordions.find('.js-team-section-mob').each(function(num){
        	if($(this).parent('slide-'+$(this).data('slide')).length === 0 ){
        		$accordions.find('.js-team-member.slide-'+$(this).data('slide'))
        		.append($(this));
        	}
        });
    }
};


var carouselClick = function(carousel) {
    $.each(carousel.slides, function(ii, slide) {
        if (slide.dataset.modifier > carousel.current) {
            $(slide).removeClass('left active').addClass('right');
        } else if (slide.dataset.modifier < carousel.current) {
            $(slide).removeClass('active right').addClass('left');
        } else {
            $(slide).removeClass('left right').addClass('active');
        }
    });

    $.each(carousel.controls, function(ii, control) {
        if (control.dataset.modifies != carousel.current) {
            $(control).removeClass('active');
        } else {
            $(control).addClass('active');

            if ($(window).width() >= 800) {
                // do nothing
            } else {
            }
        }
    });
};

var carouselDelay = function(carousel) {

    if (carousel.hover === false) {

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
    $.each($carousels, function(i, carousel) {

        // set up the carousel instance

        // get the width of the container for later use
        carousel.width = $(carousel).innerWidth();
        // set the height of the container but we'll mess with it later
        carousel.height = 0;
        // counter for position of the carousel
        carousel.current = 0;
        // find all the slides int he carousel
        carousel.slides = $(carousel).find('.js-carousel-section');
        // find all the controls 
        carousel.controls = $(carousel).find('.js-carousel-control .control');
        // monitor the hover state on the carousel
        carousel.hover = false;

        // iterate over each slide in carousel and assign it a number, initial state and correct width
        $.each(carousel.slides, function(ii, slide) {
            $(slide).addClass('slide-' + ii);
            slide.dataset.modifier = (ii);
            $(slide).innerWidth(carousel.width);
            $(slide).innerHeight('');

            if ($(window).width() >= 800) {
	            if ($(slide).innerHeight() > carousel.height) {
	                carousel.height = $(slide).innerHeight();
	            }
	          }

        });

        // iterate over the controels and assign them a class also
        $.each(carousel.controls, function(ii, control) {
            $(control).addClass('slide-' + ii);
            control.dataset.modifies = (ii);
        });

        $(carousel.controls).on('click hover', function(event) {
        		if ($(this).hasClass('active') && $(window).width() < 800) {
        			$(this).removeClass('active');
        			carousel.current = '';
	            carouselClick(carousel);
              console.log('close item')
        		} else {
	            carousel.current = this.dataset.modifies;
	            carouselClick(carousel);
              console.log('open item')
	          }
        });

        // Commented out height because messing with images

        $.each(carousel.slides, function(ii, slide) {
            $(slide).innerHeight(carousel.height);
            $(carousel).innerHeight(carousel.height);
        });
        if ($(window).width() < 800) {
        	$.each(carousel.slides, function(ii, slide) {
                $(slide).innerHeight('');
                $(carousel).innerHeight('');
            });	
        }

        if ($(window).width() >= 800) {
            carouselClick(carousel);
        }
    });
};