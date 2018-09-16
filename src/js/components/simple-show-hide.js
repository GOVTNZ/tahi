//
// * @author chrometoaster.com
// * @requires jquery.js and styling
// * @summary Shows and hides some content in an acessible way.
// * To use follow the html structure below. You do not need to use the html elements in this example.
// * NB: The data attributes are javascript hooks, while the classes are for styling only.
// *
// *  <div class="b-simple-show-hide-js">
//        <button data-"b-simple-show-hide-js-trigger="true"
//            data-simple-show-hide-js-target="simple-show-hide-js1">The drop down trigger</button>
//        <div class="b-"b-simple-show-hide-js__target"
//            id="simple-show-hide-js1" aria-hidden="true" data-simple-show-hide-js-target="true">
//           <p>The content of the drop down<p>
//        </div>
// *  </div>
// *


var SimpleShowHide = (function () {
    'use strict';

    var _options = {
        baseObjectString: 'b-simple-show-hide-js',
    };

    var _bindTriggerClick = function ($triggers) {
        $triggers.each(function (index, el) {
            var $trigger = $(this);

            $trigger.attr({
                'aria-owns': '#' + $trigger.data(_options.baseObjectString + '-target'),
                role: 'button',
                'aria-haspopup': true,
            });

            $trigger.off('click.simpleShowHide').on('click.simpleShowHide', function (e) {
                e.preventDefault();

                var $target = $('#' + $trigger.data(_options.baseObjectString + '-target'));

                //$target.toggle();

                if ($target.attr('aria-hidden') === 'true') {
                    $trigger.addClass('open');
                    $trigger.removeClass('closed');
                    $target.attr('aria-hidden', 'false');

                } else {
                    $trigger.removeClass('open');
                    $trigger.addClass('closed');
                    $target.attr('aria-hidden', 'true');
                }
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
