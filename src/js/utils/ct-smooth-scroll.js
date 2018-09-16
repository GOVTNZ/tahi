/**
 * @author dan.west@chrometoaster.com
 * @requires jquery.js
 * @summary Updates in page anchor links to scroll to location on page using jquery animate
 *
*/

var CT_SmoothScroll = (function () {

    'use strict';

    var _bindUIActions = function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
                location.hostname === this.hostname
            ) {
                var $target = $(this.hash);
                $target = $target.length ? $target : $('[name=' + this.hash.slice(1) + ']');

                if ($target.length) {
                    $target.attr('tabindex', -1);
                    $('html, body').animate({
                        scrollTop: $target.offset().top,
                    }, 500, function () {
                        $target.focus();
                    });

                    return false;
                }
            }
        });
    };

    var init = function () {
        _bindUIActions();
    };

    return {
        init: init,
    };
})();
