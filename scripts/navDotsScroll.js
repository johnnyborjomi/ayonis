jQuery(document).ready(function () {

	const scrollTime = 600;
	let $currentSection = jQuery('section:first');

	function wheelScroll(event) {
		$currentSection = jQuery(event.target).closest('section');

		const isScrolledDown = event.originalEvent.deltaY > 0;
		const nextSection = isScrolledDown ? $currentSection.next() : $currentSection.prev();
		const nextSectionId = nextSection.attr('id');
		if (nextSectionId) {
			scrollToHashDebounced('#' + nextSectionId);
		}

		event.preventDefault();
	}

	$(document).on('wheel', wheelScroll);


	const $navDots = jQuery('<ul>', {'class': 'nav-dots'});
	$navDots.appendTo('body');

	const sectionIds = jQuery('section').map(function (i) {
		const sectionId = jQuery(this).attr('id');
		$navDots.append(jQuery(`<li><a href="#${sectionId}" /></li>`));
	});

	$navDots.on('click', 'a', function (event) {
		const href = jQuery(this).attr('href');
		scrollToHash(href);
		event.originalEvent.preventDefault();
	});

	//first load
	scrollToHash(location.hash || '#' + $currentSection.attr('id'));


	//todo: debounce/throtte added due to laptop touch issue
	const scrollToHashDebounced = _.throttle(scrollToHash, scrollTime * 2, {
		'leading': true,
		'trailing': false
	});

	function scrollToHash(elementHashId) {
		jQuery(window).stop();
		jQuery.scrollTo(elementHashId, scrollTime);
		history.pushState(null, null, elementHashId);

		$navDots.find('a').removeClass('selected');
		$navDots.find(`a[href="${elementHashId}"]`).addClass('selected');
		//todo: impl history support for shit browsers?
	}

});
