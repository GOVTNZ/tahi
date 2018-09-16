// Use this to initialise on document ready

$(document).ready(function () {
    'use strict';

    // Configurations shared between modaal implementations
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    var _modaalOptions = {
        options: {
            fullscreen: true,
            overlay_opacity: 1,
            background_scroll: false,
            background: '#033247',
        },

        before_open: function ($modalWrapper) {
            var $siteheader = $('#site-header'),
                $companiesLogo = $siteheader.find('.c-branded-header__logo:first').parents('a:first'),
                modalLogo;

            modalLogo = $companiesLogo.clone(true, true);
            $(modalLogo).addClass('b-modal-inner__modal-logo');
            $(modalLogo).find('.c-branded-header__logo').removeClass('c-branded-header__logo');

            if (!$.trim($('.b-modal-inner__logo-wrapper').html()).length) {
                $('.b-modal-inner__logo-wrapper').append(modalLogo);
            }
        },

        after_open: function ($modalWrapper) {
            $modalWrapper.siblings().attr('aria-hidden', 'true');
        },

        before_close: function ($modalWrapper) {
            $modalWrapper.siblings().attr('aria-hidden', 'false');
        },
    };

    // Default configurations for modaal
    var _modaalDefault = {
        fullscreen: _modaalOptions.options.fullscreen,
        overlay_opacity: _modaalOptions.options.overlay_opacity,
        background_scroll: _modaalOptions.options.background_scroll,
        background: _modaalOptions.options.background,
        before_open: _modaalOptions.before_open,
        after_open: _modaalOptions.after_open,
        before_close: _modaalOptions.before_close,
    };

    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

    // Init Libraries
    svg4everybody();
    CT_Helpers.select();


    // Init Utils
    CT_Helpers.init();
    CT_SmoothScroll.init();

    CT_Helpers.matchHeights({
        parentSelector: '.b-insight-tile-list__list-item',
        childSelector: '.b-insight-article-tile',
        columnsPerRow: 3,
        breakPoint: 0,
        condition: CT_Helpers.isSafari,
    });

    // Init components
    Video.init();
    Table.init();

    NavSlicer.init();

    SimpleShowHide.init();

    NotificationHide.init();

    // Jquery UI datepicker
    DatePicker.init();

    // Init modaals
    // jscs:disable

    $('[class*="modaal"]').each(function(){
        var $dis = $(this),
            dishref = $dis.attr('href'),
            dismodalid = $dis.attr('data-modal-id');

        if (dismodalid){
            $dis.attr('href', dismodalid);
            $dis.attr('data-href', dishref);
        }
    });

    $('.modaal--fullscreen').modaal(_modaalDefault);

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    $('.modaal--search').modaal($.extend(_modaalDefault, {
        before_open: function () {
            var $siteheader = $('#site-header'),
                $companiesLogo = $siteheader.find('.c-branded-header__logo:first').parents('a:first'),
                $registerLogo = $siteheader.find('[data-use-in-modaal="true"]'),
                modalLogoText,
                modalLogo,
                companiesLogo = this.$elem.data('js-search-and-filters-companies-logo');

            // Setup register title & logo
            if ($registerLogo.length && !companiesLogo) {
                modalLogo = $registerLogo.clone(true, true);
                modalLogoText = CT_Helpers.breaklineToSpace(modalLogo.html());
                $(modalLogo).addClass('b-search-field-and-options__modal-logo');
            }else {
                modalLogo = $companiesLogo.clone(true, true);
                modalLogoText = 'Companies Office';
                $(modalLogo).addClass('b-search-field-and-options__modal-logo b-search-field-and-options__modal-logo--companies-office');
                $(modalLogo).find('.c-branded-header__logo').removeClass('c-branded-header__logo');
            }
            //get text for heading at top of modal (text in logo)
            if (modalLogoText !== undefined) {
                $('[data-js-search-and-filters-title]').html(modalLogoText + ' search');
            }

            if (!$.trim($('[data-js-search-and-filters-modal-logo-wrapper]').html()).length) {
                $('[data-js-search-and-filters-modal-logo-wrapper]').append(modalLogo);
            }
        },

        after_open: function ($modalWrapper) {
            _modaalOptions.after_open($modalWrapper);

            //add hooks for 'search specific' styling
            $modalWrapper.find('.modaal-container').addClass('b-modal-container--search');

            //call SearchFilters.reset function, pass 'register text' for use in the title
            var $disparent = $('.b-modal-container--search'),
                searchFieldVal = '',
                categoryVal = this.$elem.data('js-search-and-filters-preselect');

            if($('.b-hero__search [data-js-search-text-input]').val() !== '') {
                var $parent = $('.b-hero__search'),
                    $categoryRadioSelected = $parent.find('[data-js-search-and-filters-categories]:first input[type=radio]:checked');

                if (categoryVal === '') {
                    categoryVal = $categoryRadioSelected.attr('value');
                }

                searchFieldVal = $parent.find('[data-js-search-text-input]').val();
            }

            SearchFilters.initialState($disparent, searchFieldVal, categoryVal);
        }
    }));

    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
});
