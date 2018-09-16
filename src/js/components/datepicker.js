/**
 * @author dan.west@chrometoaster.com
 * @requires jquery.js
 * @summary Intitialises datepicker
 *
 */

var DatePicker = (function () {
    'use strict';

    var init = function () {
        $(document).on('click', 'input.text[data-showcalendarct]', function () {
            var $element = $(this);

            $element.ssDatepicker();

            if ($element.data('datepicker')) {
                $element.datepicker('show');
            }
        });
    };

    // Expose objects here
    return {
        init: init,
    };
})();
