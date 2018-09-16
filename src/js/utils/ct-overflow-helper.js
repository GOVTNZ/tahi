/* -------------------------------------
OVERFLOW HELPER (adds a scroll button)
for tablet or mobile users
Usage:
$('...').ctOverflowHelper();
-------------------------------------
*/
$.fn.ctOverflowHelper = function () {
    'use strict';

    // Function to check button visibility
    function checkVisibility(scrollElement, $triggerLeft, $triggerRight) {
        var scrollPosition = scrollElement.scrollLeft(),
            parentWidth = (scrollElement.children().width() - scrollElement.width());

        // Check left position
        if (scrollPosition === 0) {
            $triggerLeft.removeClass('b-scroll-trigger-js--active');
        } else if (scrollPosition > 0) {
            $triggerLeft.addClass('b-scroll-trigger-js--active');
        }

        // Check right position
        if (scrollPosition < parentWidth) {
            $triggerRight.addClass('b-scroll-trigger-js--active');
        } else if (scrollPosition >= parentWidth) {
            $triggerRight.removeClass('b-scroll-trigger-js--active');
        }
    }

    return this.each(function () {

        // Variables
        var $panel = $(this),
            scrollElement = $panel.closest('.l-overflow-liner'),
            distance = 100,
            $triggerLeft,
            $triggerRight;

        $triggerLeft = $panel.find('.b-scroll-trigger-js.b-scroll-trigger-js__left');
        $triggerRight = $panel.find('.b-scroll-trigger-js.b-scroll-trigger-js__right');

        // Append buttons
        if ($triggerLeft.length === 0) {
            $triggerLeft = $(
                '<div class="b-scroll-trigger-js b-scroll-trigger-js__left">' +
                    '<button class="b-scroll-trigger-js__button"><span class="h-visuallyhidden">Scroll left</span>' +
                    '<svg class="h-icon h-icon--large b-scroll-trigger-js__icon" aria-hidden="true">' +
                    '<use xlink:href="../img/icons/svg-sprite.svg#arrow-icon-left"></use></svg></button>' +
                '</div>');
            $triggerRight = $(
                '<div class="b-scroll-trigger-js b-scroll-trigger-js__right">' +
                    '<button class="b-scroll-trigger-js__button"><span class="h-visuallyhidden">Scroll right</span>' +
                    '<svg class="h-icon h-icon--large b-scroll-trigger-js__icon" aria-hidden="true">' +
                    '<use xlink:href="../img/icons/svg-sprite.svg#arrow-icon-right"></use></svg></button>' +
                '</div>');
            scrollElement.append($triggerLeft).append($triggerRight);
        } else {

            // remove events
            $triggerLeft.off('click');
            $triggerRight.off('click');
            scrollElement.off('scroll');
        }

        // Calculate width of buttons
        var widthAdjustment = ($triggerLeft.width() * 3);

        // Scroll on click
        $triggerLeft.on('click', function () {

            // calculate distance to scroll
            distance = ($panel.width() - widthAdjustment);

            // Scroll
            scrollElement.stop().animate({ scrollLeft: '-=' + distance }, '500', 'swing', function () {
                checkVisibility(scrollElement, $triggerLeft, $triggerRight);
            });
        });

        $triggerRight.on('click', function () {

            // calculate distance to scroll
            distance = ($panel.width() - widthAdjustment);

            // Scroll
            scrollElement.stop().animate({ scrollLeft: '+=' + distance }, '500', 'swing', function () {
                checkVisibility(scrollElement, $triggerLeft, $triggerRight);
            });
        });

        // Check visibility on load
        checkVisibility(scrollElement, $triggerLeft, $triggerRight);

        // Check visibility on scroll
        scrollElement.on('scroll', function () {
            checkVisibility(scrollElement, $triggerLeft, $triggerRight);
        });

    });
};
