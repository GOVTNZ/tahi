$(document).ready(function() {

    //=======================
    // scrollspy
    //=======================


    var lastId,
    HeaderHeight = $('header').outerHeight() + 10,
    nav = $('#kss-nav'),
    // All list items
    navItems = nav.find('a'),
    // Anchors corresponding to nav items
    scrollItems = navItems.map(function(){
        var item = $('#' + $(this).attr('href').split('#')[1]);

        if (item.length) {
            return item;
        };
    });

    // Bind to scroll
    $(window).scroll(function(){
        var fromTop;
        // Get container scroll position, if scroll position is within the header height, freeze the FromTop so level 1 nav keeps active state

        if ($(this).scrollTop() <= HeaderHeight){
            fromTop = HeaderHeight;
        }else {
            fromTop = $(this).scrollTop();
        }

        // Get id of current scroll item
        var cur = scrollItems.map(function(){

            if ($(this).offset().top - 15 < fromTop)
                return this;
        });


        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : '';

        if (lastId !== id) {
            lastId = id;
            navItems.parents('.kss-nav__menu:first > .kss-nav__menu-item').removeClass('active');
            navItems.parents('.kss-nav__menu-child .kss-nav__menu-item').removeClass('active highlight');
            navItems.filter('[href$="#'+id+'"]').parents('.kss-nav__menu-item:first').addClass('active highlight');
        }

    });
    // add margin-bottom to the last section, so scroll spy works even with sections minimized
    $('article section:last').css({'margin-bottom' : $(window).height()});
});
