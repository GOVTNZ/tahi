/**
 * @author dan.west@chrometoaster.com
 * @requires jquery.js, b-video.scss
 * @summary Intitialises the video underneath a poster frame by adding the src element
 *
 */

var Video = (function () {
    'use strict';

    var init = function () {
        $(document).on('click', '.b-video-js__trigger', function (ev) {
            ev.preventDefault();
            var $poster = $(this);
            var $wrapper = $poster.closest('.b-video-js');


            var $iframe = $wrapper.find('.b-video-js__iframe');
            var src = $iframe.data('src');

            // hide poster
            $wrapper.addClass('b-video-js--active');

            // add iframe src in, starting the video
            $iframe.attr('src', src);
        });
    };

    // Expose objects here
    return {
        init: init,
    };
})();
