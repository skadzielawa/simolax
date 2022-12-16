/* Simolax v1.0.0 */
(function ($) {
	'use strict';

	$.fn.simolax = function (options) {
		// default options
		// var settings = $.extend({
		// 	ratio: '0.5'
		// }, options);

		// function to check if element is in viewport
		function isElementInViewport(el) {
			// special bonus for those using jQuery
			if (typeof jQuery === 'function' && el instanceof jQuery) {
				el = el[0];
			}
			var rect = el.getBoundingClientRect();
			return (
				rect.bottom >= 0 &&
				rect.right >= 0 &&
				rect.top <=
					(window.innerHeight ||
						document.documentElement.clientHeight) &&
				rect.left <=
					(window.innerWidth || document.documentElement.clientWidth)
			);
		}

		function setTransformation(el, img, ratio, isCentered) {
			if (
				typeof jQuery === 'function' &&
				el instanceof jQuery &&
				img instanceof jQuery
			) {
				el = el[0];
				img = img[0];
			}
			var rect = el.getBoundingClientRect();
			var top = rect.top;
			var height = rect.height;

			// set CSS transform
			if (isCentered) {
				var width = img.clientWidth;
				$(img).css(
					'transform',
					'translate3D(' +
						-width / 2 +
						'px, ' +
						top * ratio +
						'px, 0)'
				);
			} else {
				$(img).css(
					'transform',
					'translate3D( 0px, ' + top * ratio + 'px, 0)'
				);
			}
		}

		var element = $('[data-simolax-section]');

		element.each(function () {
			var $this = $(this);
			var $image = $(this).find('[data-simolax-item]');
			var ratio = $image.data('simolax-ratio');
			var isCentered = $image.data('simolax-iscentered');

			setTransformation($this, $image, ratio, isCentered);

			$(window).on('resize', function () {
				setTransformation($this, $image, ratio, isCentered);
			});

			$(window).on('scroll', function () {
				if (isElementInViewport($this)) {
					setTransformation($this, $image, ratio, isCentered);
				}
			});
		});
	};
})(jQuery);
