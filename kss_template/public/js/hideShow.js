$(document).ready(function() {

    $('.show-hide-js').each(function(){
       	var $dis = $(this),
    		originalbuttontext= $dis.text();

		$dis.attr('data-original-value', originalbuttontext);
    });

    $('.show-hide-js').each(function(index, el) {
		var $dis = $(this);

        $dis.on('click', function() {

        	if($dis.hasClass('open')){
	        	$dis.removeClass('open');
        		$dis.html($dis.attr('data-original-value'));
        	}else {
	        	$dis.addClass('open');
        		$dis.html($dis.attr('data-alt-value'));
        	}

            $(this).next().toggle();
        });

    });

    // add a show/hide button to all sections within .main

    $('.kss-section').each(function(){
        var $dis = $(this),
        $firstheading = $dis.find('h2:first');

        if($('.show-hide-content').length){
            $('<button class="show_hide-content-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="chevron-icon-down" width="100%" height="100%"><title>Toggle section</title><path d="M46.32 11.54a2.25 2.25 0 0 0-3.28 0L24 31.35 5 11.54a2.26 2.26 0 0 0-3.28 0 2.49 2.49 0 0 0 0 3.42l20.64 21.51a2.28 2.28 0 0 0 3.28 0L46.32 15a2.49 2.49 0 0 0 0-3.46z"></path></svg></button>').insertAfter($firstheading);
        }
    });


    // show hide content

    $('.kss-section .show_hide-content-button,.kss-section .kss-title__permalink').on('click', function(e){
        var $dis = $(this),
        $dissection = $dis.parents('.kss-section:first'),
        $container = $dissection.find('.show-hide-content:first'),
        containerinitialheight;


        if($dissection.hasClass('open')){
            containerinitialheight = $container.height();

            $container.attr('data-height', containerinitialheight);

            $dissection.removeClass('open');
            $container.css({'height': '0px'});
        }else{
            $dissection.addClass('open');
            $container.css({'height': 'auto'})
        }

        e.preventDefault();
    });
});