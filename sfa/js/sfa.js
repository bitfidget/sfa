window.onload = function() {

    var $btnsToggle = $('.js-btn-toggle');
	var resizeTimer;

    $btnsToggle.on('click touch', function(event) {
        $('.' + event.target.dataset.modifies).toggleClass('active');
    });

    var $squares = $('.js-square');

    $.each($squares, function(i, v) {
        $(v).outerHeight($(v).outerWidth());
    });

    carouselInit();
    initAccordion();

    $(window).bind('resize', function() {
        
		clearTimeout(resizeTimer);
	  	resizeTimer = setTimeout(function() {
	        carouselSize();
	        reintialiseAccordion();        
	  	}, 500);
        
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

        reintialiseAccordion();

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


var reintialiseAccordion = function() {
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


var carouselClick = function(mod) {
    console.log('open .slide-' + mod)
    $('.bg-industry').removeClass('active').addClass('left');
    $('.control').removeClass('active');
    $('.slide-' + mod).removeClass('left right').addClass('active');
};

var carouselClose = function() {
    console.log('close .slide')
    $('.bg-industry').removeClass('active').addClass('left');
    $('.control').removeClass('active');
};

var carousel;

var carouselSize = function() {

    carousel.width = $(carousel).innerWidth();
    carousel.height = 0;


    if ($(window).width() >= 800) {
        $.each(carousel.slides, function(ii, slide) {
            if ($(slide).innerHeight() > carousel.height) {
                carousel.height = $(slide).innerHeight();
            }
        });
        $.each(carousel.slides, function(ii, slide) {
            $(slide).innerHeight(carousel.height);
            $(slide).innerWidth(carousel.width);
        });
        $(carousel).innerHeight(carousel.height);
        carouselClick(carousel.current);
    } else {
        $.each(carousel.slides, function(ii, slide) {
            $(slide).innerHeight('');
            $(carousel).innerHeight('');
            $(slide).innerWidth(carousel.width);
        });
    }
};

var carouselInit = function() {

    carousel = $('.js-carousel-container')[0];

    carousel.controls = '';

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
    });

    // iterate over the controls and assign them a class also
    $.each(carousel.controls, function(ii, control) {
        $(control).addClass('slide-' + ii);
        control.dataset.modifies = (ii);
    });

    // if ($(window).width() < 800) {

    //     $('.control.active').on('click touch', function() {
    //         carousel.current = -1;
    //         carouselClose();
    //     })

    // }

    $(carousel.controls).on('click touch', function(event) {
        event.preventDefault();

        var mod = this.dataset.modifies;

        if ( $(this).hasClass('active') && ($(window).width() < 800) ) {
            carousel.current = -1;
            carouselClose();
            return false;
        }
        

        
		// if (($(window).width() < 800) && (carousel.current === mod)) {
  //           carousel.current = -1;
  //           carouselClose();
		// } else {
        carousel.current = mod;
        carouselClick(mod);
        // }
        console.log(carousel.current);

    });


    carouselSize();

    
    

    
};