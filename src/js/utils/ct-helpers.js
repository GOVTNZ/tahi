/**
 * @requires jquery.js
 *
 * @author dan.west@chrometoaster.com
 *
 * @summary Utilitiy functions. This should be used to apply general js classes to the document and referenced by
 * other components to perform simple, small and repeatable tasks.
 *
 */

var CT_Helpers = (function () {

    'use strict';

    // ----------------------
    // Define private methods
    // ----------------------

    var _applyHelpers = function () {

        var $body = $('body');

        // Generate Util classes

        // JS enabled
        $body.addClass('js-enabled');

        // Used to add class for focus states when using keyboard
        $body.removeClass('js-wai-outline');
        $body.mousedown(function () {
            $(this).removeClass('js-wai-outline');
        });

        $body.keydown(function (e) {
            var keyCode = e.keyCode || e.which;

            if (keyCode === 9 || keyCode === 27) {
                $(this).addClass('js-wai-outline');
            }
        });

        // Submit these forms on change
        $(document).on('change', '[data-submit-onchange="true"]', function (event) {
            event.preventDefault();
            $(this).find('input[type="submit"]').click();
        });
    };


    // ---------------------
    // Define public methods
    // ---------------------

    var init = function () {
        _applyHelpers();
    };

    /**
     * Browser test
     * @see https://stackoverflow.com/a/40463096
     */
    var isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

    /**
     * Match the height of all children to the tallest parent
     *
     * @param {string} parentSelector - CSS selector
     * @param {string} childSelector - CSS selector
     * @param {number} [columnsPerRow=-1] - Number of columns in a row
     * @param {number} [breakPoint=0] - Screen width at which CSS columns are applied
     * @param {string} [condition=true] - Condition under which to apply height matching
     *
     * @example
     * CT_Helpers.matchHeights({
     *  parentSelector: '.b-insight-tile-list__list-item',
     *  childSelector: '.b-insight-article-tile',
     *  columnsPerRow: 3,
     *  breakPoint: 0,
     *  condition: CT_Helpers.isSafari,
     * });
     *
     * @author dan.smith@chrometoaster.com
     */
    var matchHeights = function (options) {

        var settings = $.extend({
            parentSelector: '',
            childSelector: '',
            columnsPerRow: -1,
            breakPoint: 0,
            condition: true,
        }, options);

        var $parents = $(settings.parentSelector);

        if (!$parents.length) {
            return;
        }

        // if the condition fails, exit here
        if (settings.condition === false) {
            return;
        }

        // if the window is narrower than the breakpoint, exit here
        if (window.innerWidth < settings.breakPoint) {
            return;
        }

        // number of items to process
        var length = $parents.length;

        // unless specified, treat all columns the same
        if (settings.columnsPerRow === -1) {
            settings.columnsPerRow = length;
        }

        // range for processing
        var start = 0;
        var end = settings.columnsPerRow;

        // jQuery objects to process
        var $parentsInRow;
        var $childrenInRow;

        // heights array
        var heights = [];

        // height to apply
        var maxHeight = 0;

        while (start < length) {

            if ((start + settings.columnsPerRow) < length) {
                // split the set from the start index to the end index, excluding the end index
                end = start + settings.columnsPerRow;
                $parentsInRow = $parents.slice(start, end);
            } else {
                // split the set from the start index to the last item
                $parentsInRow = $parents.slice(start);
            }

            $childrenInRow = $parentsInRow.find(settings.childSelector);

            // create array of heights ($.each fails linting)
            for (var i = 0; i < $parentsInRow.length; i++) {
                heights.push($parentsInRow.eq(i).height());
            }

            // get the largest number from the array
            maxHeight = Math.max.apply(Math, heights);

            // Apply this height to all children
            $childrenInRow.css('min-height', maxHeight);

            // update the start for the next go-round
            start += settings.columnsPerRow;

            // reset heights array
            heights = [];
        }
    };


    var select = function (selector, options) {
        selector = typeof selector === 'undefined' ? 'select' : selector;
        options = $.extend({ mobile: true }, options);
        $(selector).dropkick(options);
    };

    var debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var _this = this;
            var context = _this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };

            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    };

    /**
     * Get an collection containing all parameters from the current url
     *
     * @returns {{}}
     * @private
     */
    var urlParams = function () {
        var urlParams,
            match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); },
            query  = window.location.search.substring(1);

        urlParams = {};
        while ((match = search.exec(query)) !== null) {
            urlParams[decode(match[1])] = decode(match[2]);
        }

        return urlParams;
    };

    /**
     * Escape HTML in string
     *
     * @param string
     * @returns {string}
     */
    var escapeHtml = function (string) {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;',
        };

        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
            return entityMap[s];
        });
    };


    /**
     * Convert breakline <br> to space
     *
     * @param html
     * @returns {string}
     */
    var breaklineToSpace = function (html) {
        return $.trim($(html.replace(/<br\s*\/?>/gi, ' ')).text());
    };


    // --------------------------
    // Expose methods and objects
    // --------------------------

    return {
        init: init,
        select: select,
        debounce: debounce,
        urlParams: urlParams,
        escapeHtml: escapeHtml,
        matchHeights: matchHeights,
        isSafari: isSafari,
        breaklineToSpace: breaklineToSpace,
    };
})();
