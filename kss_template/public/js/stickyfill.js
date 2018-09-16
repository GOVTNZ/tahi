$(document).ready(function() {
    var stickyobjects = [];

    $('.sticky').each(function(e){
        var $dis = $(this),
            top = $dis.offset().top;
        $dis.attr('data-offset-top', top);

        stickyobjects.push($dis);
    })

    window.onscroll = function() {
        var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        $.each(stickyobjects, function(i, dis){
            var $dis = dis,
                top = $dis.attr('data-offset-top');

            if (y > top) {
                $dis.addClass('stuck').css({'top': '0px'});
            }
            else {
                $dis.removeClass('stuck');
            }
        });
    };
});
