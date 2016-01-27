requirejs.config({
    shim: {
        "jquery.lazyload": ["jquery"]
    }
});

requirejs(['jquery', 'jquery.lazyload', 'logo-interactivity', 'blog-post-interactivity', 'tags-interactivity'], function($) {
    $('img.img-responsive').lazyload();
});
