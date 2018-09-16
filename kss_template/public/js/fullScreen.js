$(document).ready(function() {

    $('.kss-expando').each(function(index, el) {

        var $expando = $(this);

        $expando.on('click', function(event) {
            /* Act on the event */
            event.preventDefault();

            // Calc intial
            var $iframe = $(this).next('iframe');

            var $close = $iframe.closest('.kss-resizable').find('.kss-expando-close');

            var iframe = $iframe[0];

            var first = iframe.getBoundingClientRect();

            // Calc middle
            $iframe.addClass('kss-is-expanded');

            var middle = iframe.getBoundingClientRect();

            var invertScaleHeight = first.height / middle.height;

            var invertScaleWidth = first.width / middle.width;


            // Invert
            iframe.style.transform = 'scale(' + invertScaleWidth + ', ' + invertScaleHeight + ')';


            // Get last co-ordinates
            var last = iframe.getBoundingClientRect();

            var invertTop = first.top - last.top;

            var invertLeft = first.left - last.left;

            iframe.style.transform = 'translate(' + invertLeft + 'px, ' + invertTop + 'px) scale(' + invertScaleWidth + ', ' + invertScaleHeight + ')';

            // // Animate in modal body
            requestAnimationFrame(function() {
                // Switch on animations.
                iframe.classList.add('animate-in');

                // GO GO GOOOOOO!
                iframe.style.transform = '';
                iframe.style.opacity = 1;

                $close.css({
                    display: 'block',
                    position: 'fixed',
                    'z-index': 11,
                    top: 0,
                    right: 0,
                    visibility: 'visible'
                });

            });


            // // Add Close modal handler
            $iframe.one('transitionend', function() {

                $close.on('click', function() {
                    iframe.style.transform = 'translate(' + invertLeft + 'px, ' + invertTop + 'px) scale(' + invertScaleWidth + ', ' + invertScaleHeight + ')';
                    iframe.style.opacity = 0;

                    $iframe.one('transitionend', function() {
                        iframe.style.transform = '';
                        iframe.style.transition = '';
                        iframe.style.opacity = '';
                        iframe.style.display = '';
                        $iframe.removeClass('kss-is-expanded');
                        $iframe.removeClass('animate-in');
                        $close.css({
                            display: 'none'
                        });
                    });
                });
            });

        });
    });


});
