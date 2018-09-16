jQuery(document).ready(function ($) {
    'use strict';

    /*
     * CT: This has been forked from the original version to facilitate show hide containers with lots of content
     * CT updates include..
     * - Handling the animation event so max height is removed when the expand animation is completed
     * - Reformtting code style so conforms to CT standards
     * - Adding a lock to prevent clicking the accordion trigger multiple times while in motion
     *
     * jQuery simple and accessible hide-show system (collapsible regions), using ARIA
     * @version v1.6.0
     * Website: https://a11y.nicolas-hoffmann.net/hide-show/
     * License MIT: https://github.com/nico3333fr/jquery-accessible-hide-show-aria/blob/master/LICENSE
     * NB: This has been forked from the original version to facilitate show hide containers with lots of content
     */

    // loading expand paragraphs
    // these are recommended settings by a11y experts. You may update to fulfill your needs, but be sure of what you’re doing.
    var attrControl = 'data-controls',
        attrExpanded = 'aria-expanded',
        attrLabelledby = 'data-labelledby',
        attrHidden = 'data-hidden',
        $expandmore = $('.js-expandmore'),
        $body = $('body'),
        delay = 1500,
        hash = window.location.hash.replace('#', ''),
        multiexpandable = true,
        isAnimating = false;


    if ($expandmore.length) { // if there are at least one :)
        $expandmore.each(function (indexToExpand) {
            var $this = $(this),
                indexLisible = indexToExpand + 1,
                options = $this.data(),
                $hideshowPrefixClasses =
                    typeof options.hideshowPrefixClass !== 'undefined' ? options.hideshowPrefixClass + '-' : '',
                $toExpand = $this.next('.js-to_expand'),
                $expandmoreText = $this.html();

            $this.html(
                '<button type="button" class="' + $hideshowPrefixClasses +
                'expandmore__button js-expandmore-button">' + $expandmoreText + '</button>'
            );

            var $button = $this.children('.js-expandmore-button');

            $toExpand.addClass($hideshowPrefixClasses + 'expandmore__to_expand').stop().delay(delay).queue(function () {
                var $this = $(this);
                if ($this.hasClass('js-first_load')) {
                    $this.removeClass('js-first_load');
                }
            });

            $button.attr('id', 'label_expand_' + indexLisible);
            $button.attr(attrControl, 'expand_' + indexLisible);
            $button.attr(attrExpanded, 'false');

            $toExpand.attr('id', 'expand_' + indexLisible);
            $toExpand.attr(attrHidden, 'true');
            $toExpand.attr(attrLabelledby, 'label_expand_' + indexLisible);

            // quick tip to open (if it has class is-opened or if hash is in expand)
            if ($toExpand.hasClass('is-opened') || (hash !== '' && $toExpand.find($('#' + hash)).length)) {
                $button.addClass('is-opened').attr(attrExpanded, 'true');
                $toExpand.removeClass('is-opened').removeAttr(attrHidden);
            }


        });


    }


    $body.on('click', '.js-expandmore-button', function (event) {
        if (isAnimating === false) {
            var $this = $(this),
                $destination = $('#' + $this.attr(attrControl));

            if ($this.attr(attrExpanded) === 'false') {

                if (multiexpandable === false) {
                    $('.js-expandmore-button').removeClass('is-opened').attr(attrExpanded, 'false');
                    $('.js-to_expand').attr(attrHidden, 'true');
                }

                $this.addClass('is-opened').attr(attrExpanded, 'true');

                $this.find('[data-js-hide-when-open]:first')
                    .attr('data-hidden', true)
                    .removeClass('showing')
                    .addClass('hidden');

                // Lock the click handler
                isAnimating = true;

                $destination.removeAttr(attrHidden);

                window.requestAnimationFrame(function () {
                    $destination.off('transitionend.showhidein').on('transitionend.showhidein', function (event) {

                        $destination.css('max-height', 'none');

                        $destination.off();
                        isAnimating = false;
                    });
                });

            } else {
                $this.removeClass('is-opened').attr(attrExpanded, 'false');


                // Lock the click handler
                isAnimating = true;

                $destination.attr('style', '');

                setTimeout(function () {
                    $destination.attr(attrHidden, 'true');

                    $destination.off('transitionend.showhideout').on('transitionend.showhideout', function (event) {
                        $this.find('[data-js-hide-when-open]:first')
                            .attr('data-hidden', false)
                            .removeClass('hidden')
                            .addClass('showing');
                        $destination.off();
                        isAnimating = false;
                    });
                }, 100);
            }

            event.preventDefault();

        }

    });

    $body.on('click keydown', '.js-expandmore', function (event) {
        if (isAnimating === false) {
            var $this = $(this),
                $target = $(event.target),
                $buttonIn = $this.find('.js-expandmore-button');

            if (!$target.is($buttonIn) && !$target.closest($buttonIn).length) {

                if (event.type === 'click') {
                    $buttonIn.trigger('click');
                    return false;
                }

                if (event.type === 'keydown' && (event.keyCode === 13 || event.keyCode === 32)) {
                    $buttonIn.trigger('click');
                    return false;
                }

            }
        }
    });


});
