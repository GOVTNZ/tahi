// This is a copy of silverstripe jquery.ui.datepicker-en-GB.js & DateField.js but has been moved here so everything related
// to the datepicker is handled by gulp frontend and removed from SS. This way we can load a smaller version
// of jquery UI that doesn't include a load of unused functionality and keep all dependencies for the datepicker
// in one place.

/*
 * English/UK (UTF-8) initialisation for the jQuery UI date picker plugin.
 * Adapted to match the Zend Data localization for SilverStripe CMS
 * See: README
 */

'use strict';

jQuery(function ($) {
    $.datepicker.regional['en-GB'] = {
        closeText: 'Done',
        prevText: 'Prev',
        nextText: 'Next',
        currentText: 'Today',
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        weekHeader: 'Wk',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
    };

    $.datepicker.setDefaults($.datepicker.regional['en-GB']);
});



(function ($) {
    $.fn.extend({
        ssDatepicker: function (opts) {

            return $(this).each(function () {
                if ($(this).data('datepicker')) {
                    return; // already applied
                }

                $(this).siblings('button').addClass('ui-icon ui-icon-calendar');

                var holder = $(this).parents('.field.date:first'),
                    config = $.extend(opts || {}, $(this).data(), $(this).data('jqueryuiconfig'), {});

                if (!config.showcalendarct) {
                    return;
                }

                if (config.locale && $.datepicker.regional[config.locale]) {
                    config = $.extend(config, $.datepicker.regional[config.locale], {});
                }

                if (config.min) {
                    config.minDate = $.datepicker.parseDate('yy-mm-dd', config.min);
                }

                if (config.max) {
                    config.maxDate = $.datepicker.parseDate('yy-mm-dd', config.max);
                }

                // Initialize and open a datepicker
                // live() doesn't have "onmatch", and jQuery.entwine is a bit too heavyweight for this,
                // so we need to do this onclick.
                config.dateFormat = config.jquerydateformat;
                $(this).datepicker(config);
            });
        },
    });

    $(document).on('click', '.field.date input.text,.fieldholder-small input.text.date', function () {
        $(this).ssDatepicker();
        if ($(this).data('datepicker')) {
            $(this).datepicker('show');
        }
    });
}(jQuery));
