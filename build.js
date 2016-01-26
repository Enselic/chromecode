/*

node_modules/requirejs/bin/r.js -o build.js

*/
({
    baseUrl: "js",
    paths: {
        "jquery": "jquery-2.1.4.min",
        "jquery.lazyload": "jquery.lazyload-1.9.7.min",
        "logo-interactivity": "logo-interactivity-md5_a1f7c226"
    },
    shim: {
        "jquery.lazyload": ["jquery"]
    },
    name: "app-md5_6fbc147f",
    out: "js/app-md5_6fbc147f-built.js"
})
