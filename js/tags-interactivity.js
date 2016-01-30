define(['jquery'], function($) {
    'use strict';

    $(".post-list-header").each(function() {
        $(this).click(function(){
            $(this).nextAll("ul.posts:first").slideToggle();
        });
    });
});
