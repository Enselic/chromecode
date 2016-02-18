define(['jquery'], function($) {
    'use strict';

    function expandContent(readMore) {
        var toExpand = $(readMoreDom).prevAll(".content");

        // Measure sizes to animate between
        var heightBefore = $(toExpand).height();
        toExpand.removeClass('collapsed');
        var heightAfter = $(toExpand).height();
        var diff = Math.abs(heightAfter - heightBefore);

        // Make expand animation speed independent of blog post length
        var pixelsPerSecond = 600;
        var animLengthInMs = diff / pixelsPerSecond * 1000;

        // Set up initial size and animate
        toExpand.height(heightBefore);
        toExpand.animate({height: heightAfter}, animLengthInMs, function(){
            toExpand.css('height', '')
            toExpand.removeClass('fade-last-line')
        });

        $(readMoreDom).css('visibility', 'hidden');
        $(readMoreDom).animate({width: 0, paddingRight: 0}, 350);
    }

    $(".blog-post .google-tag-manager-read-more-button").each(function() {
        $(this).one('click', function(){
            expandContent(this);
        });
    });

    $(".blog-post .content.collapsed").each(function() {
        $(this).one('click', function(){
            expandContent($(this).parent().find(".google-tag-manager-read-more-button"));
        });
    });
});

