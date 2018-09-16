//
// * @author chrometoaster.com
// * @requires jquery.js and styling
// * @summary Hides (itself) content in an acessible way.
// * To use follow the html structure below. You do not need to use the html elements in this example.
// * NB: The data attributes are javascript hooks, while the classes are for styling only.
// *
// *  <div class="some-class" data-js-simple-hide-target="true">
//        <button data-js-simple-hide-trigger="true"
//            Hide</button>
// *  </div>
// *


var NotificationHide = (function () {
    'use strict';

    var _options = {
        baseObjectString: 'js-simple-hide',
        cookieHideValue: 'hide',
    };

    var _bindTriggerClick = function ($triggers) {
        $triggers.each(function (index, el) {
            var $trigger = $(this),
                $container = $trigger.parents('[data-' + _options.baseObjectString + '-target]:first');

            // Hide notification is cookie exits
            if (Cookies.set($container.attr('id')) === 'hide') {
                $container.remove();

                return;
            }

            $trigger.attr({
                'aria-owns': $trigger.parents('[data-' + _options.baseObjectString + '-target]:first'),
                role: 'button',
            });

            $trigger.one('click.NotificationHide', function (e) {
                var $trigger = $(this),
                    $target = $trigger.parents('[data-' + _options.baseObjectString + '-target]:first');

                e.preventDefault();

                $target.attr('data-hidden', 'true');

                $target.one('transitionend.NotificationHide', function () {
                    // Store the fact this has been closed uses “js-cookie”
                    Cookies.set($target.attr('id'), _options.cookieHideValue, {
                        expires: $target.data('dismiss-expiry-time'),
                        domain: 'companiesoffice.govt.nz',
                    });
                });
            });
        });
    };

    var init = function () {
        var $triggers = $('[data-' + _options.baseObjectString + '-trigger]');

        if ($triggers.length) {
            _bindTriggerClick($triggers);
        }
    };

    // Expose objects here
    return {
        init: init,
    };
})();
