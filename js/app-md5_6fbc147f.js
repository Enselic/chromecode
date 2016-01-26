requirejs.config({
    paths: {
        "jquery": "jquery-2.1.4.min",
        "jquery.lazyload": "jquery.lazyload-1.9.7.min",
        "logo-interactivity": "logo-interactivity-md5_a1f7c226"
    },
    shim: {
        "jquery.lazyload": ["jquery"]
    }
});

requirejs(['jquery', 'jquery.lazyload', 'logo-interactivity'], function($) {
    $('img.img-responsive').lazyload();

    $(".post-list-header").each(function() {
        $(this).click(function(){
            $(this).next("ul.posts").slideToggle();
        });
    });

    $(".blog-entry .expand").each(function() {
        $(this).click(function(){
            var toExpandOrCollapse = $(this).prev("section");
            if (toExpandOrCollapse.is(':animated')) {
                return;
            }
            var fadeLastLineAtEndOfAnimation = false;
            if (toExpandOrCollapse.hasClass('blog-entry-content-collapsed')) {
                $(this).html('Collapse');
                toExpandOrCollapse.removeClass("fade-last-line");
            } else {
                $(this).html('Expand');
                fadeLastLineAtEndOfAnimation = true;
            }

            // Measure sizes to animate between
            var heightBefore = $(toExpandOrCollapse).height();
            toExpandOrCollapse.toggleClass('blog-entry-content-collapsed');
            var heightAfter = $(toExpandOrCollapse).height();
            var diff = Math.abs(heightAfter - heightBefore);

            // Make expand animation speed independent of blog post length
            var pixelsPerSecond = 200;
            var animLengthInMs = diff / pixelsPerSecond * 1000;

            // Set up initial size and animate
            toExpandOrCollapse.height(heightBefore);
            toExpandOrCollapse.animate({height: heightAfter}, animLengthInMs, function(){
                toExpandOrCollapse.css('height', '');
                if (fadeLastLineAtEndOfAnimation) {
                    toExpandOrCollapse.addClass("fade-last-line");
                }
            });
        });
    });
});
