window.onload = function() {

var $btnsToggle = $('.js-btn-toggle');

	$btnsToggle.on('click touch', function(event) {
		// debugger
		$('.' + event.target.dataset.modifies).toggleClass('active');
	})
}

var scrollTo = function(elem, space) {
	console.log(space)
	$('html,body').animate({
    scrollTop: $(elem).offset().top - (60 + space)},
    'slow');
	if ($('.navigation-main').hasClass('active')) {
		$('.navigation-main').removeClass('active')
	}
};

