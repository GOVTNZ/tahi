/**
 * @author dan.west@chrometoaster.com
 * @requires jquery.js
 * @summary Removes items from the nav when text starts to wrap onto 3 lines
 *
 */

var NavSlicer = (function () {
    'use strict';

    var _options = {
        baseObjectString: 'c-navigation-bar-js',
    },
    maxRows = 2,
    navDropDownActive = false;


    var _getMaxHeight = function ($link) {
        var lineHeight = $link.css('line-height');

        lineHeight = parseFloat(lineHeight);

        var maxHeight = lineHeight * maxRows;

        return maxHeight;
    };

    var _getActualHeight = function ($link) {
        var paddingTop = $link.css('padding-top');
        paddingTop = parseFloat(paddingTop);

        var paddingBottom = $link.css('padding-bottom');
        paddingBottom = parseFloat(paddingBottom);

        var totalVertPadding = paddingTop + paddingBottom;

        var actualHeight = $link.outerHeight() - totalVertPadding;

        // console.log($link.height())

        return actualHeight;
    };

    var _restructureNav = function ($navItems, linkHeight) {

        var $last = $navItems.last();
        var $lastClone = $last.clone();

        $last.hide();

        // Populate the more link
        $('.' + _options.baseObjectString + '__show-more-items').prepend($lastClone);

        // Show the more link
        $('.' + _options.baseObjectString + '__show-more').show();


        // re check
        var $newNavItems = $('.' + _options.baseObjectString + '__list > .' + _options.baseObjectString + '__item:visible')
            .not('.' + _options.baseObjectString + '__show-more')
            .not('.' + _options.baseObjectString + '__logo');

        _checkLinks($newNavItems);

        // console.log($newNavItems);
    };

    var _checkLinks = function ($navItems) {

        var $links = $navItems.find('.' + _options.baseObjectString + '__link-inner');

        $links.each(function (index, el) {
            var $link = $(this);

            // console.log('max height::  ' + _getMaxHeight($link));
            // console.log('actual height::  ' + _getActualHeight($link));

            var linkHeight = _getActualHeight($link);
            var maxHeight = _getMaxHeight($link) + 10;

            if (linkHeight > maxHeight) {
                // console.log(index + ' size is too big');

                return _restructureNav($navItems, linkHeight);

            }
        });
    };

    var _resetNav = function (callback) {
        $('.' + _options.baseObjectString + '__list > .' + _options.baseObjectString + '__item')
            .not('.' + _options.baseObjectString + '__logo').show();
        $('.' + _options.baseObjectString + '__show-more-items *').remove();
        $('.' + _options.baseObjectString + '__show-more').hide();

        callback();
    };

    var init = function () {
        if ($.ua.browser.name === 'IE' && parseInt($.ua.browser.version.split('.')[0], 10) <= 10) {
            $('.' + _options.baseObjectString + '__link').css('display', 'block');
        }

        var $navItems = $('.' + _options.baseObjectString + '__list > .' + _options.baseObjectString + '__item')
            .not('.' + _options.baseObjectString + '__show-more')
            .not('.' + _options.baseObjectString + '__logo');


        var fontASubset = new FontFaceObserver('Gustan');

        Promise.all([fontASubset.load()]).then(function () {

            _checkLinks($navItems);

        });


        // Resize trigger
        // used for ios where a scroll can trigger resize
        var resizeCachedWidth = $(window).width();

        // Re initialise on resize
        var resizeTimer;
        $(window).on('resize', function (e) {

            var resizeNewWidth = $(window).width();

            // Check to see if width has actually changed (ios specific)
            if (resizeNewWidth !== resizeCachedWidth) {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function () {
                    _resetNav(function () {
                        var $newNavItems = $('.' + _options.baseObjectString + '__list > .' +
                                _options.baseObjectString + '__item:visible')
                            .not('.' + _options.baseObjectString + '__show-more')
                            .not('.' + _options.baseObjectString + '__logo');

                        _checkLinks($newNavItems);
                    });
                }, 200);
            }
        });
    };

    // Expose objects here
    return {
        init: init,
    };
})();
