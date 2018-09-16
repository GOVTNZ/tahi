$(document).ready(function () {

    // var HeaderHeight = $('header').outerHeight() + 40;

    // if (window.location.hash.length) {
    //     var target = $(window.location.hash),
    //     level = target.attr('id').split('-').length;

    //     smoothscroll(target, level);
    // }

    // $('a[href*="#"]:not([href="#"])').click(function() {
    //     console.log('clicked smoothscroll');

    //     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    //         var target = $(this.hash),
    //         level;

    //         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    //         //level will check if the element clicked is the main level, which means it needs to scroll up further to show the hearder
    //         level = target.attr('id').split('-').length;

    //         smoothscroll(target, level)

    //         return false;
    //     }
    // });

    // function smoothscroll(target, level){

    //     if (target.length) {

    //         if(level <= 2) {
    //             $('html, body').animate({
    //                 scrollTop: 0
    //             }, 500);
    //         }else{
    //             $('html, body').animate({
    //                 scrollTop: target.offset().top
    //             }, 500);
    //         }

    //         window.location = window.location.pathname + '#' + target.attr('id');

    //     };
    // };
});
