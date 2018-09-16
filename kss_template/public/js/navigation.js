$(document).ready(function() {


    // add a show/hide button to all nav levels that have sub navigation

    $('.kss-nav__menu-item').each(function(){
        var $dis = $(this);

        if($dis.find('ul').length){
            $dis.addClass('hassubnav');
            $('<button class="show_hide-content-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="chevron-icon-down" width="100%" height="100%"><title>Toggle section</title><path d="M46.32 11.54a2.25 2.25 0 0 0-3.28 0L24 31.35 5 11.54a2.26 2.26 0 0 0-3.28 0 2.49 2.49 0 0 0 0 3.42l20.64 21.51a2.28 2.28 0 0 0 3.28 0L46.32 15a2.49 2.49 0 0 0 0-3.46z"></path></svg></button>').insertAfter($dis.find('a:first'));
        }
    });


    // show hide subnavigation

    $('.kss-nav .show_hide-content-button').on('click', function(e){
        var $dis = $(this),
        $aparently = $dis.parents('li:first');

        $aparently.toggleClass('open');

        e.preventDefault();
    });
});
