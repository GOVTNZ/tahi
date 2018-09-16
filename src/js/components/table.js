/**
 * @author dan.west@chrometoaster.com
 * @requires jquery.js, b-video.scss
 * @summary Intitialises the video underneath a poster frame by adding the src element
 *
 */

var Table = (function () {
    'use strict';

    var init = function () {
        $('.b-table-js').find('table').ctOverflowHelper();
    };

    // Expose objects here
    return {
        init: init,
    };
})();
